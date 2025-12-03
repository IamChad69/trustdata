import { NextRequest } from "next/server";
import { safeHandler } from "@/utils/safeHandler";
import { createClientFromConnectionId } from "@/lib/db/queries/createClient";
import { getUserCount } from "@/lib/db/queries/getUserCount";
import { getActivePaidUsers } from "@/lib/db/queries/getActivePaidUsers";
import { getNewSignups } from "@/lib/db/queries/getNewSignups";
import { getGrowthRates } from "@/lib/db/queries/getGrowthRates";
import { prisma } from "@/lib/db";
import { getCachedMetrics, wasRecentlyUpdated } from "@/lib/cache";

interface MetricsResponse {
  totalUsers: number | null;
  paidUsers: number | null;
  newSignups30d: number;
  conversionRate: number | null; // Percentage of paid users out of total users
  monthlyGrowthRate: number | null;
  growthRate: number | null; // Growth rate from getGrowthRates
}

/**
 * GET /api/metrics?connectionId=xxx
 * Fetches metrics from a user's database connection
 */
export async function GET(request: NextRequest) {
  return safeHandler(async () => {
    const searchParams = request.nextUrl.searchParams;
    const connectionId = searchParams.get("connectionId");

    if (!connectionId) {
      throw new Error("connectionId is required");
    }

    // Verify connection exists
    const connection = await prisma.databaseConnection.findUnique({
      where: { id: connectionId },
    });

    if (!connection) {
      throw new Error("Database connection not found");
    }

    // Use cached metrics or fetch fresh data
    const metrics = await getCachedMetrics(
      connectionId,
      async () => {
        // Check if we can use cached data from database (if recently updated by cron)
        // For detailed metrics (newSignups, growthRate), we still need to fetch
        // But we can use cached totalUsers and paidUsers if available
        const useCachedBasicMetrics =
          wasRecentlyUpdated(connectionId) &&
          connection.totalUsers !== null &&
          connection.paidUsers !== null;

    // Create database client
    const client = await createClientFromConnectionId(connectionId);

    try {
      // Connect to database
      await client.connect();

          // If we have cached basic metrics, only fetch detailed metrics
          let totalUsers: number | null;
          let paidUsers: number | null;

          if (useCachedBasicMetrics) {
            // Use cached values
            totalUsers = connection.totalUsers;
            paidUsers = connection.paidUsers;
            console.log(
              `Using cached metrics for ${connectionId}: ${totalUsers} total, ${paidUsers} paid`
            );
          } else {
            // Fetch all metrics
            [totalUsers, paidUsers] = await Promise.all([
          getUserCount(client),
          getActivePaidUsers(client),
            ]);
          }

          // Always fetch detailed metrics (these change more frequently)
          const [newSignups30d, monthlyGrowthRate] = await Promise.all([
          getNewSignups(client, 30),
          getGrowthRates(client),
        ]);

      // Calculate conversion rate: percentage of paid users out of total users
      let conversionRate: number | null = null;
      if (totalUsers !== null && paidUsers !== null && totalUsers > 0) {
            conversionRate =
              Math.round((paidUsers / totalUsers) * 100 * 100) / 100; // Round to 2 decimal places
      }

          // Update connection with latest metrics (if we fetched them)
          if (!useCachedBasicMetrics) {
      await prisma.databaseConnection.update({
        where: { id: connectionId },
        data: {
          totalUsers,
          paidUsers,
          updatedAt: new Date(),
        },
      });
          }

          const result: MetricsResponse = {
        totalUsers,
        paidUsers,
        newSignups30d,
        conversionRate,
        monthlyGrowthRate,
        growthRate: monthlyGrowthRate, // Growth rate from getGrowthRates
      };

          return result;
    } finally {
      // Always close the client connection
      try {
        await client.end();
      } catch (error) {
        console.error("Error closing database connection:", error);
      }
    }
      }
    );

    return metrics;
  });
}
