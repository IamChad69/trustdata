import { Client } from "pg";
import type { ParsedCredentials } from "@/lib/integrations/supabase/validateCredentials";

/**
 * Creates a PostgreSQL client for Supabase database connections
 * @param credentials - Parsed database credentials
 * @returns pg.Client instance configured for Supabase
 */
export function createSupabaseClient(
  credentials: ParsedCredentials
): Client {
  return new Client({
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
  });
}

/**
 * Creates a Supabase client from decrypted credentials
 * This is used when retrieving credentials from the database
 */
export interface DbCredentialFields {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  ssl: boolean;
}

export function createSupabaseClientFromFields(
  fields: DbCredentialFields
): Client {
  return createSupabaseClient({
    host: fields.host,
    port: fields.port,
    database: fields.database,
    username: fields.username,
    password: fields.password,
    ssl: fields.ssl,
  });
}

