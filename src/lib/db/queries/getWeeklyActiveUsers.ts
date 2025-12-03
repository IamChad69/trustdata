import { Client } from "pg"
import { findUserTable, detectUserTableSchema } from "./schema-detection"
import * as postgresQueries from "./postgres-queries"
import type { TimeRange } from "./getUserGrowthData"

export interface WeeklyActiveUsersDataPoint {
	date: string // ISO date string
	wau: number // Weekly Active Users count for that period
}

/**
 * Gets Weekly Active Users (WAU) trend over time for the specified range
 * Returns daily or weekly data points showing users active in the last 7 days
 * @param client - PostgreSQL client connected to the database
 * @param timeRange - Time range to fetch data for (default: "30d")
 * @returns Array of data points with date and WAU count
 */
export async function getWeeklyActiveUsers(
	client: Client,
	timeRange: TimeRange = "30d"
): Promise<WeeklyActiveUsersDataPoint[]> {
	try {
		// Find user table using schema detection
		const userTable = await findUserTable(client)
		if (!userTable) {
			console.log("No user table found for weekly active users data")
			return []
		}

		// Detect schema to get last_active_at or updated_at column
		const userSchema = await detectUserTableSchema(
			client,
			userTable.schema,
			userTable.name
		)

		if (!userSchema) {
			console.log(
				`Could not detect schema for ${userTable.schema}.${userTable.name}`
			)
			return []
		}

		// Determine which column to use for activity tracking
		// Priority: last_active_at > updated_at
		const activityColumn =
			userSchema.lastActiveColumn || userSchema.updatedAtColumn

		if (!activityColumn) {
			console.log(
				`No last_active_at or updated_at column found in ${userTable.schema}.${userTable.name}. Skipping WAU calculation.`
			)
			return []
		}

		const tableRef = postgresQueries.getTableRef(
			userTable.schema,
			userTable.name
		)
		const idColumn = userSchema.idColumn

		// Calculate date range based on timeRange parameter
		const now = new Date()
		let startDate: Date | null = null
		let interval: string

		if (timeRange === "all") {
			// For "all time", get the oldest activity date
			const oldestDateQuery = `
        SELECT MIN("${activityColumn}")::timestamp as oldest_date
        FROM ${tableRef}
        WHERE "${activityColumn}" IS NOT NULL
      `
			try {
				const oldestResult = await client.query(oldestDateQuery)
				const oldestDateStr = oldestResult.rows[0]?.oldest_date
				if (oldestDateStr) {
					startDate = new Date(oldestDateStr)
					startDate.setHours(0, 0, 0, 0)
					// Add 7 days to start date since we need 7 days of history for first WAU calculation
					startDate.setDate(startDate.getDate() + 7)
				}
			} catch (error) {
				console.error("Error getting oldest date:", error)
				// Fallback to 1 year ago if we can't get oldest date
				startDate = new Date()
				startDate.setFullYear(startDate.getFullYear() - 1)
				startDate.setHours(0, 0, 0, 0)
			}
			// For all time, use weekly grouping
			interval = "1 week"
		} else {
			// For specific ranges
			startDate = new Date()
			switch (timeRange) {
				case "7d":
					startDate.setDate(now.getDate() - 7)
					interval = "1 day"
					break
				case "30d":
					startDate.setDate(now.getDate() - 30)
					interval = "1 day"
					break
			}
			startDate.setHours(0, 0, 0, 0)
			// Add 7 days to start date since we need 7 days of history for first WAU calculation
			startDate.setDate(startDate.getDate() - 7)
		}

		if (!startDate) {
			console.log("Could not determine start date")
			return []
		}

		// Map interval to PostgreSQL date_trunc unit
		const dateTruncUnit = interval === "1 week" ? "week" : "day"

		// Query to get WAU for each period
		// For each period date, count users active in the 7 days ending on that date
		// Generate a complete date series and calculate WAU for each period
		const query = `
      WITH date_series AS (
        SELECT generate_series(
          DATE_TRUNC($3::text, $1::timestamp)::timestamp,
          DATE_TRUNC($3::text, $2::timestamp)::timestamp,
          $4::interval
        )::timestamp AS period_date
      )
      SELECT 
        ds.period_date::date AS period_date,
        (
          SELECT COUNT(DISTINCT u."${idColumn}")::int
          FROM ${tableRef} u
          WHERE u."${activityColumn}" IS NOT NULL
            AND u."${activityColumn}" >= (ds.period_date - INTERVAL '7 days')
            AND u."${activityColumn}" <= ds.period_date
        ) AS wau
      FROM date_series ds
      WHERE ds.period_date >= ($1 + INTERVAL '7 days')
      ORDER BY ds.period_date
    `

		const result = await client.query(query, [
			startDate,
			now,
			dateTruncUnit,
			interval,
		])

		// Transform to our data format
		const dataPoints: WeeklyActiveUsersDataPoint[] = result.rows.map(
			(row) => {
				const date = new Date(row.period_date)
				const dateStr = date.toISOString().split("T")[0]
				return {
					date: dateStr,
					wau: parseInt(row.wau || "0", 10),
				}
			}
		)

		return dataPoints
	} catch (error) {
		console.error("Error fetching weekly active users data:", error)
		return []
	}
}

