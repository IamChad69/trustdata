import { Client } from "pg";
import { findUserTable, detectUserTableSchema } from "./schema-detection";
import * as postgresQueries from "./postgres-queries";
import type { TimeRange } from "./getUserGrowthData";

export interface NewUsersDataPoint {
  date: string; // ISO date string
  newUsers: number; // New signups for that period (daily or weekly)
}

/**
 * Gets new user signups over time for the specified range
 * Returns daily or weekly data points showing new signups per period
 * @param client - PostgreSQL client connected to the database
 * @param timeRange - Time range to fetch data for (default: "30d")
 * @returns Array of data points with date and new user count
 */
export async function getNewUsersData(
  client: Client,
  timeRange: TimeRange = "30d"
): Promise<NewUsersDataPoint[]> {
  try {
    // Find user table using schema detection
    const userTable = await findUserTable(client);
    if (!userTable) {
      console.log("No user table found for new users data");
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
    let interval: string;

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
      // For all time, use weekly grouping
      interval = "1 week";
    } else {
      // For specific ranges
      startDate = new Date();
      switch (timeRange) {
        case "7d":
          startDate.setDate(now.getDate() - 7);
          interval = "1 day";
          break;
        case "30d":
          startDate.setDate(now.getDate() - 30);
          interval = "1 day";
          break;
      }
      startDate.setHours(0, 0, 0, 0);
    }

    if (!startDate) {
      console.log("Could not determine start date");
      return [];
    }

    // Map interval to PostgreSQL date_trunc unit
    const dateTruncUnit = interval === "1 week" ? "week" : "day";

    // Query to get new signups grouped by period
    // Generate a complete date series and left join actual signups
    // This ensures we show all periods, including those with 0 new users
    const query = `
      WITH date_series AS (
        SELECT generate_series(
          DATE_TRUNC($3::text, $1::timestamp)::timestamp,
          DATE_TRUNC($3::text, $2::timestamp)::timestamp,
          $4::interval
        )::timestamp AS period_date
      ),
      signup_counts AS (
        SELECT 
          DATE_TRUNC($3::text, "${createdAtCol}")::timestamp AS period_date,
          COUNT(*)::int AS new_users
        FROM ${tableRef}
        WHERE "${createdAtCol}" >= $1
          AND "${createdAtCol}" <= $2
        GROUP BY DATE_TRUNC($3::text, "${createdAtCol}")::timestamp
      )
      SELECT 
        ds.period_date::date AS period_date,
        COALESCE(sc.new_users, 0)::int AS new_users
      FROM date_series ds
      LEFT JOIN signup_counts sc ON ds.period_date = sc.period_date
      ORDER BY ds.period_date
    `;

    const result = await client.query(query, [
      startDate,
      now,
      dateTruncUnit,
      interval,
    ]);

    // Transform to our data format
    const dataPoints: NewUsersDataPoint[] = result.rows.map((row) => {
      const date = new Date(row.period_date);
      const dateStr = date.toISOString().split("T")[0];
      return {
        date: dateStr,
        newUsers: parseInt(row.new_users || "0", 10),
      };
    });

    return dataPoints;
  } catch (error) {
    console.error("Error fetching new users data:", error);
    return [];
  }
}
