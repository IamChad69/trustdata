import { NextRequest } from "next/server";
import { safeHandler } from "@/utils/safeHandler";
import { prisma } from "@/lib/db";

interface UpdateStartupDetailsRequest {
	startupName?: string;
	slug?: string;
	tagline?: string;
	description?: string;
	website?: string;
	category?: string;
	logo?: string;
	founderName?: string;
	founderHandle?: string;
	founderAvatar?: string;
	totalUsers?: number | null;
	paidUsers?: number | null;
}

/**
 * GET /api/connect/[connectionId]
 * Gets startup details for a database connection
 */
export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ connectionId: string }> }
) {
	return safeHandler(async () => {
		const { connectionId } = await params;

		// Validate connectionId
		if (!connectionId) {
			throw new Error("Connection ID is required");
		}

		// Get connection with startup details
		const connection = await prisma.databaseConnection.findUnique({
			where: { id: connectionId },
			select: {
				id: true,
				startupName: true,
				slug: true,
				tagline: true,
				description: true,
				website: true,
				category: true,
				logo: true,
				founderName: true,
				founderHandle: true,
				founderAvatar: true,
				provider: true,
			},
		});

		if (!connection) {
			throw new Error("Database connection not found");
		}

		return connection;
	});
}

/**
 * PATCH /api/connect/[connectionId]
 * Updates startup details for a database connection
 */
export async function PATCH(
	request: NextRequest,
	{ params }: { params: Promise<{ connectionId: string }> }
) {
	return safeHandler(async () => {
		const { connectionId } = await params;
		const body: UpdateStartupDetailsRequest = await request.json();

		// Validate connectionId
		if (!connectionId) {
			throw new Error("Connection ID is required");
		}

		// Check if connection exists and get current values
		const connectionExists = await prisma.databaseConnection.findUnique({
			where: { id: connectionId },
		});

		if (!connectionExists) {
			throw new Error(
				"Database connection not found. Please create a connection first."
			);
		}

		// Use existing values if not provided (for editing)
		const startupNameToUpdate = body.startupName || connectionExists.startupName;
		const slugToUpdate = body.slug || connectionExists.slug;

		// Validate required fields
		if (!startupNameToUpdate) {
			throw new Error("Startup name is required");
		}
		if (!slugToUpdate) {
			throw new Error("Slug is required");
		}

		// Validate slug format (alphanumeric and hyphens only)
		if (!/^[a-z0-9-]+$/.test(slugToUpdate)) {
			throw new Error(
				"Slug must contain only lowercase letters, numbers, and hyphens"
			);
		}

		// Check if slug is already taken by another connection
		if (slugToUpdate !== connectionExists.slug) {
			const existingConnection = await prisma.databaseConnection.findUnique({
				where: { slug: slugToUpdate },
			});

			if (existingConnection && existingConnection.id !== connectionId) {
				throw new Error("This slug is already taken. Please choose another.");
			}
		}

		// Update database connection with startup details
		const connection = await prisma.databaseConnection.update({
			where: { id: connectionId },
			data: {
				startupName: startupNameToUpdate,
				slug: slugToUpdate,
				tagline: body.tagline !== undefined ? body.tagline || null : connectionExists.tagline,
				description: body.description !== undefined ? body.description || null : connectionExists.description,
				website: body.website !== undefined ? body.website || null : connectionExists.website,
				category: body.category !== undefined ? body.category || null : connectionExists.category,
				logo: body.logo !== undefined ? body.logo || null : connectionExists.logo,
				founderName: body.founderName !== undefined ? body.founderName || null : connectionExists.founderName,
				founderHandle: body.founderHandle !== undefined ? body.founderHandle || null : connectionExists.founderHandle,
				founderAvatar: body.founderAvatar !== undefined ? body.founderAvatar || null : connectionExists.founderAvatar,
				// Include metrics if provided (from background fetch)
				totalUsers: body.totalUsers !== undefined ? body.totalUsers : connectionExists.totalUsers,
				paidUsers: body.paidUsers !== undefined ? body.paidUsers : connectionExists.paidUsers,
				updatedAt: new Date(),
			},
		});

		return {
			id: connection.id,
			startupName: connection.startupName,
			slug: connection.slug,
			description: connection.description,
		};
	});
}

/**
 * DELETE /api/connect/[connectionId]
 * Deletes a database connection and its associated startup
 */
export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<{ connectionId: string }> }
) {
	return safeHandler(async () => {
		const { connectionId } = await params;

		// Validate connectionId
		if (!connectionId) {
			throw new Error("Connection ID is required");
		}

		// Check if connection exists
		const connectionExists = await prisma.databaseConnection.findUnique({
			where: { id: connectionId },
		});

		if (!connectionExists) {
			throw new Error("Database connection not found");
		}

		// Delete the connection
		await prisma.databaseConnection.delete({
			where: { id: connectionId },
		});

		return { success: true, message: "Startup deleted successfully" };
	});
}

