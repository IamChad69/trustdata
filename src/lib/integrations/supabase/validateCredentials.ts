/**
 * Validates and parses a Supabase connection string
 * Format: postgresql://[user]:[password]@[host]:[port]/[database]?sslmode=require
 */

export interface ParsedCredentials {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  ssl: boolean;
}

/**
 * Validates and parses a Supabase PostgreSQL connection string
 * @param connectionString - The connection string from Supabase
 * @returns Parsed credentials object
 * @throws Error if connection string is invalid
 */
export function validateCredentials(
  connectionString: string
): ParsedCredentials {
  if (!connectionString || typeof connectionString !== "string") {
    throw new Error("Connection string is required");
  }

  // Remove whitespace
  const cleaned = connectionString.trim();

  // Check if it starts with postgresql:// or postgres://
  if (!cleaned.startsWith("postgresql://") && !cleaned.startsWith("postgres://")) {
    throw new Error(
      "Invalid connection string format. Must start with postgresql:// or postgres://"
    );
  }

  try {
    // Parse the URL
    const url = new URL(cleaned);

    // Extract components
    const host = url.hostname;
    const port = url.port ? parseInt(url.port, 10) : 5432; // Default PostgreSQL port
    const database = url.pathname.slice(1); // Remove leading slash
    const username = url.username || "";
    const password = url.password || "";

    // Validate required fields
    if (!host) {
      throw new Error("Host is missing from connection string");
    }
    if (!database) {
      throw new Error("Database name is missing from connection string");
    }
    if (!username) {
      throw new Error("Username is missing from connection string");
    }
    if (!password) {
      throw new Error("Password is missing from connection string");
    }

    // Validate port
    if (isNaN(port) || port < 1 || port > 65535) {
      throw new Error("Invalid port number");
    }

    // Check SSL mode from query params
    const sslMode = url.searchParams.get("sslmode");
    const ssl =
      sslMode === "require" ||
      sslMode === "prefer" ||
      sslMode === "verify-ca" ||
      sslMode === "verify-full" ||
      // Default to true for Supabase
      sslMode === null;

    return {
      host,
      port,
      database,
      username,
      password,
      ssl,
    };
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("Invalid connection string format");
    }
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to parse connection string");
  }
}

