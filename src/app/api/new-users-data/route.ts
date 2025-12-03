import { NextRequest } from "next/server";
import { safeHandler } from "@/utils/safeHandler";
import { createClientFromConnectionId } from "@/lib/db/queries/createClient";
import { getNewUsersData } from "@/lib/db/queries/getNewUsersData";
import type { TimeRange } from "@/lib/db/queries/getUserGrowthData";
import { prisma } from "@/lib/db";

/**
 * GET /api/new-users-data?connectionId=xxx&timeRange=30d
 * Fetches new user signups over time from a user's database connection
 * @param timeRange - Time range: "7d", "30d", "all" (default: "30d")
 */
export async function GET(request: NextRequest) {
  return safeHandler(async () => {
    const searchParams = request.nextUrl.searchParams;
    const connectionId = searchParams.get("connectionId");
    const timeRange = (searchParams.get("timeRange") || "30d") as TimeRange;

    if (!connectionId) {
      throw new Error("connectionId is required");
    }

    // Validate timeRange
    const validTimeRanges: TimeRange[] = ["7d", "30d", "all"];
    const validTimeRange = validTimeRanges.includes(timeRange)
      ? timeRange
      : "30d";

    // Verify connection exists
    const connection = await prisma.databaseConnection.findUnique({
      where: { id: connectionId },
    });

    if (!connection) {
      throw new Error("Database connection not found");
    }

    // Create database client
    const client = await createClientFromConnectionId(connectionId);

    try {
      // Connect to database
      await client.connect();

      // Fetch new users data with specified time range
      const newUsersData = await getNewUsersData(client, validTimeRange);

      return newUsersData;
    } finally {
      // Always close the client connection
      try {
        await client.end();
      } catch (error) {
        console.error("Error closing database connection:", error);
      }
    }
  });
}
