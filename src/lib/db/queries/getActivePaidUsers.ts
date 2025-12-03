import { Client } from "pg";
import { findUserTable, detectPaidUserSource } from "./schema-detection";
import * as postgresQueries from "./postgres-queries";

/**
 * Gets the count of active paid users
 * Uses schema detection to find subscription tables or paid user columns
 * @param client - PostgreSQL client connected to the database
 * @returns Number of active paid users, or null if subscription table doesn't exist
 */
export async function getActivePaidUsers(
  client: Client
): Promise<number | null> {
  try {
    // Find user table first
    const userTable = await findUserTable(client);
    if (!userTable) {
      console.log("No user table found, cannot determine paid users");
      return null;
    }

    // Detect paid user source (table or column)
    const paidUserSource = await detectPaidUserSource(
      client,
      userTable.name,
      userTable.schema
    );

    if (!paidUserSource) {
      console.log("No paid user source detected");
      return null;
    }

    console.log(
      `Detected paid user source: ${paidUserSource.type} - ${paidUserSource.source}`
    );

    const userTableRef = postgresQueries.getTableRef(
      userTable.schema,
      userTable.name
    );

    // Handle column-based paid users
    if (paidUserSource.type === "column") {
      const paidCol = paidUserSource.source;
      try {
        // Try various patterns for paid column
        const queries = [
          `SELECT COUNT(*)::int as count 
           FROM ${userTableRef} 
           WHERE "${paidCol}" IS NOT NULL 
             AND ("${paidCol}"::text ILIKE '%paid%' 
               OR "${paidCol}"::text ILIKE '%premium%' 
               OR "${paidCol}"::text ILIKE '%pro%' 
               OR "${paidCol}"::boolean = true 
               OR "${paidCol}"::text != 'free')`,
          `SELECT COUNT(*)::int as count 
           FROM ${userTableRef} 
           WHERE "${paidCol}" = true`,
          `SELECT COUNT(*)::int as count 
           FROM ${userTableRef} 
           WHERE "${paidCol}" != 'free'`,
        ];

        for (const query of queries) {
          try {
            const result = await client.query(query);
            const count = parseInt(result.rows[0]?.count || "0", 10);
            if (!isNaN(count) && count >= 0) {
              console.log(`✓ Found ${count} paid users from column ${paidCol}`);
              return count;
            }
          } catch {
            continue;
          }
        }
      } catch (error) {
        console.log(`Error querying paid column ${paidCol}:`, error);
      }
    }

    // Handle table-based paid users (subscription table)
    if (paidUserSource.type === "table") {
      const subTableRef = postgresQueries.getTableRef(
        paidUserSource.schema,
        paidUserSource.source
      );
      const userIdCol = paidUserSource.userIdColumn || "user_id";
      const statusCol = paidUserSource.statusColumn || "status";

      try {
        // Query subscription table for active subscriptions
        const queries = [
          `SELECT COUNT(DISTINCT "${userIdCol}")::int as count 
           FROM ${subTableRef} 
           WHERE "${statusCol}" = 'active'`,
          `SELECT COUNT(DISTINCT "${userIdCol}")::int as count 
           FROM ${subTableRef} 
           WHERE LOWER("${statusCol}") = 'active'`,
          `SELECT COUNT(DISTINCT "${userIdCol}")::int as count 
           FROM ${subTableRef} 
           WHERE "${statusCol}" IN ('active', 'trialing', 'paid')`,
          `SELECT COUNT(DISTINCT "${userIdCol}")::int as count 
           FROM ${subTableRef} 
           WHERE "${statusCol}"::text ILIKE '%active%'`,
        ];

        for (const query of queries) {
          try {
            const result = await client.query(query);
            const count = parseInt(result.rows[0]?.count || "0", 10);
            if (!isNaN(count) && count >= 0) {
              console.log(
                `✓ Found ${count} paid users from subscription table ${paidUserSource.source}`
              );
              return count;
            }
          } catch (error) {
            console.log(
              `Query failed for subscription table:`,
              error instanceof Error ? error.message : error
            );
            continue;
          }
        }
      } catch (error) {
        console.log(
          `Error querying subscription table ${paidUserSource.source}:`,
          error
        );
      }
    }

    return null;
  } catch (error) {
    console.log(
      "Error detecting or querying paid users:",
      error instanceof Error ? error.message : error
    );
    return null;
  }
}
