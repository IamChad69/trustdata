import { NextRequest } from "next/server";
import { safeHandler } from "@/utils/safeHandler";
import { validateCredentials } from "@/lib/integrations/supabase/validateCredentials";
import { testConnection } from "@/lib/integrations/supabase/testConnection";
import { fetchProjectName } from "@/lib/integrations/fetchProjectName";
import { encrypt } from "@/utils/encrypt";
import { getEncryptionKey } from "@/utils/env";
import { prisma } from "@/lib/db";

interface ConnectNeonRequest {
	connectionString: string;
}

/**
 * POST /api/connect/neon
 * Creates a database connection and tests it
 */
export async function POST(request: NextRequest) {
	return safeHandler(async () => {
		const body: ConnectNeonRequest = await request.json();

		// Validate required fields
		if (!body.connectionString) {
			throw new Error("Connection string is required");
		}

		// Parse and validate connection string
		const credentials = validateCredentials(body.connectionString);

		// Test the connection
		await testConnection(credentials);

		// Fetch project name from database
		const projectName = await fetchProjectName(credentials);

		// Get encryption key
		const encryptionKey = getEncryptionKey();

		// Create database connection
		const connection = await prisma.databaseConnection.create({
			data: {
				id: crypto.randomUUID(),
				name: `${credentials.database} (${credentials.host})`,
				provider: "neon",
				connectionString: encrypt(body.connectionString, encryptionKey),
				selectedTables: [],
				startupName: "", // Will be updated in PATCH
				updatedAt: new Date(),
			},
		});

		return {
			id: connection.id,
			connectionId: connection.id,
			projectName,
		};
	});
}

