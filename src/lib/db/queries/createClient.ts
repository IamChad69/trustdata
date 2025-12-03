import { Client } from "pg";
import { prisma } from "@/lib/db";
import { decrypt } from "@/utils/decrypt";
import { getEncryptionKey } from "@/utils/env";
import { validateCredentials } from "@/lib/integrations/supabase/validateCredentials";

/**
 * Creates a PostgreSQL client from a database connection ID
 * Decrypts the connection string and creates a client
 * @param connectionId - The database connection ID
 * @returns PostgreSQL client
 * @throws Error if connection not found or invalid
 */
export async function createClientFromConnectionId(
  connectionId: string
): Promise<Client> {
  // Get connection from database
  const connection = await prisma.databaseConnection.findUnique({
    where: { id: connectionId },
  });

  if (!connection) {
    throw new Error("Database connection not found");
  }

  // Get encryption key
  const encryptionKey = getEncryptionKey();

  // Decrypt connection string
  const decryptedConnectionString = decrypt(
    connection.connectionString,
    encryptionKey
  );

  // Parse credentials
  const credentials = validateCredentials(decryptedConnectionString);

  // Create and return client
  const client = new Client({
    host: credentials.host,
    port: credentials.port,
    database: credentials.database,
    user: credentials.username,
    password: credentials.password,
    ssl: credentials.ssl
      ? {
          rejectUnauthorized: false, // Supabase/Neon use self-signed certificates
        }
      : false,
    connectionTimeoutMillis: 10000, // 10 second timeout
  });

  return client;
}
