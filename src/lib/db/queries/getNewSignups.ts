import { Client } from "pg";
import { findUserTable, detectUserTableSchema } from "./schema-detection";
import * as postgresQueries from "./postgres-queries";

/**
 * Gets the count of new user signups in the specified date range
 * Uses schema detection to find the user table and created_at column
 * @param client - PostgreSQL client connected to the database
 * @param days - Number of days to look back (7 or 30)
 * @returns Number of new signups
 */
export async function getNewSignups(
  client: Client,
  days: 7 | 30
): Promise<number> {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  startDate.setHours(0, 0, 0, 0);

  try {
    // Find user table using schema detection
    const userTable = await findUserTable(client);
    if (!userTable) {
      console.log(`No user table found for new signups (${days}d)`);
      return 0;
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
      return 0;
    }

    const tableRef = postgresQueries.getTableRef(
      userTable.schema,
      userTable.name
    );
    const createdAtCol = userSchema.createdAtColumn;

    // Try queries with detected schema
    const queries = [
      `SELECT COUNT(*)::int as count 
       FROM ${tableRef} 
       WHERE "${createdAtCol}" >= $1`,
      `SELECT COUNT(*)::int as count 
       FROM ${tableRef} 
       WHERE "${createdAtCol}"::date >= $1::date`,
      `SELECT COUNT(*)::int as count 
       FROM ${tableRef} 
       WHERE "${createdAtCol}" >= $1::timestamp`,
    ];

    for (const query of queries) {
      try {
        const result = await client.query(query, [startDate]);
        const count = parseInt(result.rows[0]?.count || "0", 10);
        if (!isNaN(count)) {
          console.log(
            `Found ${count} new signups in ${days} days from ${userTable.schema}.${userTable.name}`
          );
          return count;
        }
      } catch (error) {
        continue;
      }
    }

    // If all queries failed, return 0
    return 0;
  } catch (error) {
    console.error(`Error getting new signups (${days}d):`, error);
    return 0;
  }
}
