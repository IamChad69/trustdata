import { Client } from "pg";
import { findUserTable, detectUserTableSchema } from "./schema-detection";
import * as postgresQueries from "./postgres-queries";

export interface UserGrowthDataPoint {
  date: string; // ISO date string
  users: number; // Cumulative user count up to that date
}

export type TimeRange = "7d" | "30d" | "all";

/**
 * Gets user growth data over time for the specified range
 * Returns daily data points showing cumulative user count
 * @param client - PostgreSQL client connected to the database
 * @param timeRange - Time range to fetch data for (default: "30d")
 * @returns Array of data points with date and cumulative user count
 */
export async function getUserGrowthData(
  client: Client,
  timeRange: TimeRange = "30d"
): Promise<UserGrowthDataPoint[]> {
  try {
    // Find user table using schema detection
    const userTable = await findUserTable(client);
    if (!userTable) {
      console.log("No user table found for growth data");
      return [];
    }

    // Detect schema to get created_at column
    const userSchema = await detectUserTableSchema(
      client,
      userTable.schema,
      userTable.name
    );

    if (!userSchema || !userSchema.createdAtColumn) {
      console.log(
        `No created_at column found in ${userTable.schema}.${userTable.name}`
      );
      return [];
    }

    const tableRef = postgresQueries.getTableRef(
      userTable.schema,
      userTable.name
    );
    const createdAtCol = userSchema.createdAtColumn;

    // Calculate date range based on timeRange parameter
    const now = new Date();
    let startDate: Date | null = null;

    if (timeRange === "all") {
      // For "all time", get the oldest user creation date
      const oldestDateQuery = `
        SELECT MIN("${createdAtCol}")::timestamp as oldest_date
        FROM ${tableRef}
      `;
      try {
        const oldestResult = await client.query(oldestDateQuery);
        const oldestDateStr = oldestResult.rows[0]?.oldest_date;
        if (oldestDateStr) {
          startDate = new Date(oldestDateStr);
          startDate.setHours(0, 0, 0, 0);
        }
      } catch (error) {
        console.error("Error getting oldest date:", error);
        // Fallback to 1 year ago if we can't get oldest date
        startDate = new Date();
        startDate.setFullYear(startDate.getFullYear() - 1);
        startDate.setHours(0, 0, 0, 0);
      }
    } else {
      // For specific ranges, calculate from now
      startDate = new Date();
      switch (timeRange) {
        case "7d":
          startDate.setDate(now.getDate() - 7);
          break;
        case "30d":
          startDate.setDate(now.getDate() - 30);
          break;
      }
      startDate.setHours(0, 0, 0, 0);
    }

    if (!startDate) {
      console.log("Could not determine start date");
      return [];
    }

    // Get baseline count (users before the start date)
    const baselineQuery = `
      SELECT COUNT(*)::int as baseline_count
      FROM ${tableRef}
      WHERE "${createdAtCol}" < $1
    `;

    await client.query(baselineQuery, [startDate]);

    // Determine interval based on time range
    // Use weekly for "all time" to avoid too many data points, daily for shorter ranges
    const interval = timeRange === "all" ? "1 week" : "1 day";

    // Query to get cumulative user counts
    // Generate complete date series to ensure all periods are included
    const query = `
      WITH date_series AS (
        SELECT generate_series(
          DATE_TRUNC($3::text, $1::timestamp)::timestamp,
          DATE_TRUNC($3::text, $2::timestamp)::timestamp,
          $4::interval
        )::timestamp AS period_date
      )
      SELECT 
        ds.period_date::date AS date,
        (
          SELECT COUNT(*)::int
          FROM ${tableRef}
          WHERE "${createdAtCol}" <= ds.period_date
        ) AS cumulative_users
      FROM date_series ds
      ORDER BY ds.period_date
    `;

    // Map interval to PostgreSQL date_trunc unit for alignment
    const dateTruncUnit = interval === "1 week" ? "week" : "day";

    const result = await client.query(query, [
      startDate,
      now,
      dateTruncUnit,
      interval,
    ]);

    // Transform to our data format
    const dataPoints: UserGrowthDataPoint[] = result.rows.map((row) => {
      const date = new Date(row.date);
      // Format as YYYY-MM-DD for daily data
      const dateStr = date.toISOString().split("T")[0];
      return {
        date: dateStr,
        users: parseInt(row.cumulative_users || "0", 10),
      };
    });

    return dataPoints;
  } catch (error) {
    console.error("Error fetching user growth data:", error);
    return [];
  }
}
