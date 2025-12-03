import { Client } from "pg";
import * as postgresQueries from "./postgres-queries";

export interface UserTableSchema {
  tableName: string;
  schema: string;
  idColumn: string;
  createdAtColumn: string;
  updatedAtColumn: string | null;
  deletedAtColumn: string | null;
  lastActiveColumn: string | null;
}

export interface PaidUserSource {
  type: "table" | "column";
  source: string;
  schema: string;
  // For table type
  userIdColumn?: string;
  statusColumn?: string;
}

/**
 * Detects the user table schema by examining column names
 */
export async function detectUserTableSchema(
  client: Client,
  schema: string,
  tableName: string
): Promise<UserTableSchema | null> {
  try {
    const columns = await postgresQueries.getTableColumns(client, tableName);

    if (columns.length === 0) {
      return null;
    }

    // Find ID column (common patterns)
    const idColumn =
      columns.find(
        (col) =>
          col.column_name.toLowerCase() === "id" ||
          col.column_name.toLowerCase() === "user_id"
      )?.column_name ||
      columns[0]?.column_name ||
      "id";

    // Find timestamp columns (case-insensitive matching)
    const columnMap = new Map(
      columns.map((col) => [col.column_name.toLowerCase(), col.column_name])
    );

    const createdAtColumn =
      columnMap.get("created_at") ||
      columnMap.get("createdat") ||
      columnMap.get("created") ||
      columnMap.get("date_created") ||
      null;

    const updatedAtColumn =
      columnMap.get("updated_at") ||
      columnMap.get("updatedat") ||
      columnMap.get("updated") ||
      columnMap.get("modified_at") ||
      null;

    const deletedAtColumn =
      columnMap.get("deleted_at") ||
      columnMap.get("deletedat") ||
      columnMap.get("deleted") ||
      null;

    const lastActiveColumn =
      columnMap.get("last_active_at") ||
      columnMap.get("lastactiveat") ||
      columnMap.get("last_login_at") ||
      columnMap.get("lastloginat") ||
      columnMap.get("last_seen_at") ||
      null;

    if (!createdAtColumn) {
      return null;
    }

    return {
      tableName,
      schema,
      idColumn,
      createdAtColumn,
      updatedAtColumn,
      deletedAtColumn,
      lastActiveColumn,
    };
  } catch (error) {
    console.error("Error detecting user table schema:", error);
    return null;
  }
}

/**
 * Finds the user table from common table names
 */
export async function findUserTable(
  client: Client
): Promise<{ schema: string; name: string } | null> {
  try {
    const allTables = await postgresQueries.listTables(client);

    // Common table names in priority order
    const commonNames = [
      "users",
      "User",
      "user",
      "accounts",
      "Account",
      "account",
      "customers",
      "members",
    ];

    // Try common names first
    for (const commonName of commonNames) {
      const table = allTables.find(
        (t) => t.toLowerCase() === commonName.toLowerCase()
      );
      if (table) {
        const userSchema = await detectUserTableSchema(client, "public", table);
        if (userSchema) {
          return { schema: "public", name: table };
        }
      }
    }

    // Try auth.users (Supabase)
    const authUsers = allTables.find((t) => t.toLowerCase() === "users");
    if (authUsers) {
      const userSchema = await detectUserTableSchema(client, "auth", authUsers);
      if (userSchema) {
        return { schema: "auth", name: authUsers };
      }
    }

    return null;
  } catch (error) {
    console.error("Error finding user table:", error);
    return null;
  }
}

/**
 * Detects subscription/paid user table or column
 */
export async function detectPaidUserSource(
  client: Client,
  userTable: string,
  userSchema: string
): Promise<PaidUserSource | null> {
  try {
    const columns = await postgresQueries.getTableColumns(client, userTable);
    const columnMap = new Map(
      columns.map((col) => [col.column_name.toLowerCase(), col.column_name])
    );

    // Check for paid user columns in users table
    const paidColumns = [
      "is_paid",
      "ispaid",
      "subscription_status",
      "subscriptionstatus",
      "plan",
      "plan_type",
      "plan_type",
    ];

    for (const colName of paidColumns) {
      const col = columnMap.get(colName.toLowerCase());
      if (col) {
        return { type: "column", source: col, schema: userSchema };
      }
    }

    // Check for subscription table
    const allTables = await postgresQueries.listTables(client);
    const subscriptionTables = allTables.filter(
      (t) =>
        t.toLowerCase().includes("subscription") ||
        t.toLowerCase().includes("payment") ||
        t.toLowerCase().includes("paying_user") ||
        t.toLowerCase().includes("paying_users")
    );

    if (subscriptionTables.length > 0) {
      // Try each subscription table
      for (const subTable of subscriptionTables) {
        const subColumns = await postgresQueries.getTableColumns(
          client,
          subTable
        );
        const subColumnMap = new Map(
          subColumns.map((col) => [
            col.column_name.toLowerCase(),
            col.column_name,
          ])
        );

        // Find user ID column
        const userIdCol =
          subColumnMap.get("user_id") ||
          subColumnMap.get("userid") ||
          subColumnMap.get("customer_id") ||
          subColumnMap.get("customerid") ||
          subColumnMap.get("account_id") ||
          null;

        // Find status column
        const statusCol =
          subColumnMap.get("status") ||
          subColumnMap.get("subscription_status") ||
          subColumnMap.get("active") ||
          null;

        if (userIdCol) {
          return {
            type: "table",
            source: subTable,
            schema: "public",
            userIdColumn: userIdCol,
            statusColumn: statusCol || undefined,
          };
        }
      }
    }

    return null;
  } catch (error) {
    console.error("Error detecting paid user source:", error);
    return null;
  }
}
