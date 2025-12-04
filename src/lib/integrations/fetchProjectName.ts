import { Client } from "pg";
import type { ParsedCredentials } from "./supabase/validateCredentials";

/**
 * Fetches the project/database name from a database connection
 * @param credentials - Parsed database credentials
 * @returns Promise that resolves with the database name
 */
export async function fetchProjectName(
	credentials: ParsedCredentials
): Promise<string> {
	const client = new Client({
		host: credentials.host,
		port: credentials.port,
		database: credentials.database,
		user: credentials.username,
		password: credentials.password,
		ssl: credentials.ssl
			? {
					rejectUnauthorized: false,
				}
			: false,
		connectionTimeoutMillis: 10000,
	});

	try {
		await client.connect();

		// Query to get the current database name
		const result = await client.query("SELECT current_database() as db_name");

		await client.end();

		const dbName = result.rows[0]?.db_name || credentials.database;

		// Format the database name to be more user-friendly
		// Remove common prefixes/suffixes and format nicely
		return formatDatabaseName(dbName);
	} catch {
		// Ensure client is closed even on error
		try {
			await client.end();
		} catch {
			// Ignore cleanup errors
		}

		// If we can't fetch, return the database name from credentials as fallback
		return formatDatabaseName(credentials.database);
	}
}

/**
 * Formats a database name to be more user-friendly
 * Removes common prefixes and formats it nicely
 */
function formatDatabaseName(dbName: string): string {
	if (!dbName) return "";

	// Remove common prefixes
	let formatted = dbName
		.replace(/^postgres_?/i, "")
		.replace(/^neondb_?/i, "")
		.replace(/^supabase_?/i, "")
		.replace(/^db_?/i, "");

	// Replace underscores and hyphens with spaces
	formatted = formatted.replace(/[_-]/g, " ");

	// Capitalize first letter of each word
	formatted = formatted
		.split(" ")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join(" ");

	return formatted.trim() || dbName;
}

