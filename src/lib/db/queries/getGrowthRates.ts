import { Client } from "pg";
import { findUserTable, detectUserTableSchema } from "./schema-detection";
import * as postgresQueries from "./postgres-queries";

/**
 * Calculates monthly growth rate (30 days)
 * Compares user count from 30 days ago to current user count
 * Uses schema detection to find the user table and created_at column
 * @param client - PostgreSQL client connected to the database
 * @returns Growth rate as a percentage (e.g., 25.5 for 25.5% growth), or null if cannot calculate (startup less than 30 days old)
 */
export async function getGrowthRates(client: Client): Promise<number | null> {
  try {
    const now = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    thirtyDaysAgo.setHours(0, 0, 0, 0);

    // Find user table using schema detection
    const userTable = await findUserTable(client);
    if (!userTable) {
      console.log("No user table found for growth rate calculation");
      return null;
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
      return null;
    }

    const tableRef = postgresQueries.getTableRef(
      userTable.schema,
      userTable.name
    );
    const createdAtCol = userSchema.createdAtColumn;

    // First, find the oldest user creation date to determine available data range
    const oldestDateQuery = `
      SELECT MIN("${createdAtCol}")::timestamp as oldest_date
      FROM ${tableRef}
    `;

    let oldestDate: Date | null = null;
    try {
      const oldestResult = await client.query(oldestDateQuery);
      const oldestDateStr = oldestResult.rows[0]?.oldest_date;
      if (oldestDateStr) {
        oldestDate = new Date(oldestDateStr);
      }
    } catch {
      console.log("Could not determine oldest date");
    }

    // Check if startup is less than 30 days old
    // If so, return null (N/A)
    if (oldestDate) {
      const daysSinceOldest = Math.floor(
        (now.getTime() - oldestDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (daysSinceOldest < 30) {
        console.log(
          `Startup is ${daysSinceOldest} days old (less than 30 days), cannot calculate monthly growth rate`
        );
        return null;
      }
    } else {
      // If we can't determine oldest date, we can't verify if it's 30+ days old
      // So we'll try to calculate, but if comparison date is invalid, it will fail gracefully
    }

    // Use 30 days ago as comparison date for monthly growth
    const comparisonDate = thirtyDaysAgo;

    // Build query with detected schema
    // Count users created at or before 30 days ago vs now
    const query = `
      SELECT 
        (SELECT COUNT(*)::int FROM ${tableRef} WHERE "${createdAtCol}" <= $1) as old_count,
        (SELECT COUNT(*)::int FROM ${tableRef} WHERE "${createdAtCol}" <= $2) as new_count
    `;

    try {
      const result = await client.query(query, [comparisonDate, now]);
      const oldCount = parseInt(result.rows[0]?.old_count || "0", 10);
      const newCount = parseInt(result.rows[0]?.new_count || "0", 10);

      console.log(
        `Monthly growth rate calculation: oldCount=${oldCount}, newCount=${newCount}, comparisonDate=${comparisonDate.toISOString()}`
      );

      // Handle edge cases
      if (!isNaN(oldCount) && !isNaN(newCount)) {
        // Case 1: No users at all
        if (newCount === 0) {
          console.log("No users found, cannot calculate growth rate");
          return null;
        }

        // Case 2: Only 1 user (can't calculate meaningful growth)
        if (newCount === 1) {
          console.log("Only 1 user found, cannot calculate growth rate");
          return null;
        }

        // Case 3: Calculate monthly growth rate
        if (oldCount > 0) {
          const growthRate = ((newCount - oldCount) / oldCount) * 100;
          const roundedRate = Math.round(growthRate * 100) / 100;
          console.log(
            `Calculated monthly growth rate: ${roundedRate}% (${oldCount} -> ${newCount} users over 30 days)`
          );
          return roundedRate;
        }

        // Case 4: No users 30 days ago but users now (shouldn't happen if we checked oldest date, but handle it)
        if (oldCount === 0 && newCount > 0) {
          console.log(
            "No users 30 days ago but users exist now - cannot calculate meaningful growth rate"
          );
          return null;
        }
      }

      console.log("Could not calculate growth rate - unexpected state");
      return null;
    } catch (error) {
      console.error("Error calculating growth rate:", error);
      return null;
    }
  } catch (error) {
    console.error("Error calculating growth rate:", error);
    return null;
  }
}
