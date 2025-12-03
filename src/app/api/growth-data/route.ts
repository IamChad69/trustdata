import { NextRequest } from "next/server";
import { safeHandler } from "@/utils/safeHandler";
import { createClientFromConnectionId } from "@/lib/db/queries/createClient";
import {
  getUserGrowthData,
  type TimeRange,
} from "@/lib/db/queries/getUserGrowthData";
import { prisma } from "@/lib/db";

/**
 * GET /api/growth-data?connectionId=xxx&timeRange=3m
 * Fetches user growth data over time from a user's database connection
 * @param timeRange - Time range: "24h", "7d", "30d", "3m", "6m", "1y" (default: "3m")
 */
export async function GET(request: NextRequest) {
  return safeHandler(async () => {
    const searchParams = request.nextUrl.searchParams;
    const connectionId = searchParams.get("connectionId");
    const timeRange = (searchParams.get("timeRange") || "3m") as TimeRange;

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

      // Fetch growth data with specified time range
      const growthData = await getUserGrowthData(client, validTimeRange);

      return growthData;
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
