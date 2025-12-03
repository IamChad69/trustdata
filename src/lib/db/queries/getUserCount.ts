import { Client } from "pg";
import { findUserTable } from "./schema-detection";
import * as postgresQueries from "./postgres-queries";

/**
 * Gets the total count of users in the database
 * Uses schema detection to find and query the user table
 * @param client - PostgreSQL client connected to the database
 * @returns Total user count, or null if cannot determine
 */
export async function getUserCount(client: Client): Promise<number | null> {
  try {
    // Find user table using schema detection
    const userTable = await findUserTable(client);

    if (!userTable) {
      console.log("No user table found");
      return null;
    }

    const tableRef = postgresQueries.getTableRef(
      userTable.schema,
      userTable.name
    );

    // Try to get count
    try {
      const result = await client.query(
        `SELECT COUNT(*)::int as count FROM ${tableRef}`
      );
      const count = parseInt(result.rows[0]?.count || "0", 10);
      if (!isNaN(count) && count >= 0) {
        console.log(
          `Found ${count} users in ${userTable.schema}.${userTable.name}`
        );
        return count;
      }
    } catch (error) {
      console.log(
        `Error querying ${userTable.schema}.${userTable.name}:`,
        error
      );
      // Try unquoted version
      try {
        const result = await client.query(
          `SELECT COUNT(*)::int as count FROM ${
            userTable.schema
          }.${userTable.name.toLowerCase()}`
        );
        const count = parseInt(result.rows[0]?.count || "0", 10);
        if (!isNaN(count) && count >= 0) {
          return count;
        }
      } catch {
        // Ignore
      }
    }

    return null;
  } catch (error) {
    console.error("Error getting user count:", error);
    return null;
  }
}
