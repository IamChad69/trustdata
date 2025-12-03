import { Client } from "pg";

/**
 * Lists all tables in the database
 */
export async function listTables(client: Client): Promise<string[]> {
  try {
    const result = await client.query(`
			SELECT table_name
			FROM information_schema.tables
			WHERE table_schema IN ('public', 'auth')
				AND table_type = 'BASE TABLE'
			ORDER BY table_name
		`);

    return result.rows.map((row: { table_name: string }) => row.table_name);
  } catch (error) {
    console.error("Error listing tables:", error);
    return [];
  }
}

/**
 * Gets all columns for a specific table
 */
export async function getTableColumns(
  client: Client,
  tableName: string
): Promise<Array<{ column_name: string; data_type: string }>> {
  try {
    // Try exact match first
    let result = await client.query(
      `
			SELECT column_name, data_type
			FROM information_schema.columns
			WHERE table_schema IN ('public', 'auth')
				AND table_name = $1
			ORDER BY ordinal_position
		`,
      [tableName]
    );

    // If no results, try case-insensitive
    if (result.rows.length === 0) {
      result = await client.query(
        `
				SELECT column_name, data_type
				FROM information_schema.columns
				WHERE table_schema IN ('public', 'auth')
					AND LOWER(table_name) = LOWER($1)
				ORDER BY ordinal_position
			`,
        [tableName]
      );
    }

    return result.rows;
  } catch (error) {
    console.error(`Error getting columns for table ${tableName}:`, error);
    return [];
  }
}

/**
 * Gets table name with schema
 */
export function getTableRef(schema: string, tableName: string): string {
  return `${schema}."${tableName}"`;
}
