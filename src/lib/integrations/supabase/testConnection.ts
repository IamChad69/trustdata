import { Client } from "pg";
import type { ParsedCredentials } from "./validateCredentials";

/**
 * Tests a database connection using the provided credentials
 * @param credentials - Parsed database credentials
 * @returns Promise that resolves if connection is successful, rejects otherwise
 */
export async function testConnection(
  credentials: ParsedCredentials
): Promise<void> {
  const client = new Client({
    host: credentials.host,
    port: credentials.port,
    database: credentials.database,
    user: credentials.username,
    password: credentials.password,
    ssl: credentials.ssl
      ? {
          rejectUnauthorized: false, // Supabase uses self-signed certificates
        }
      : false,
    connectionTimeoutMillis: 10000, // 10 second timeout
  });

  try {
    await client.connect();
    // Test query to verify connection works
    await client.query("SELECT 1");
    await client.end();
  } catch (error) {
    // Ensure client is closed even on error
    try {
      await client.end();
    } catch {
      // Ignore cleanup errors
    }

    if (error instanceof Error) {
      // Provide user-friendly error messages
      if (error.message.includes("password authentication failed")) {
        throw new Error("Invalid username or password");
      }
      if (error.message.includes("does not exist")) {
        throw new Error("Database does not exist");
      }
      if (error.message.includes("timeout")) {
        throw new Error("Connection timeout. Please check your network and firewall settings");
      }
      if (error.message.includes("ECONNREFUSED")) {
        throw new Error("Cannot connect to database server. Please check the host and port");
      }
      throw new Error(`Connection failed: ${error.message}`);
    }
    throw new Error("Connection failed: Unknown error");
  }
}

