import { NextRequest } from "next/server";
import { safeHandler } from "@/utils/safeHandler";
import { prisma } from "@/lib/db";
import { createClientFromConnectionId } from "@/lib/db/queries/createClient";
import { getGrowthRates } from "@/lib/db/queries/getGrowthRates";
import { getNewSignups } from "@/lib/db/queries/getNewSignups";

/**
 * GET /api/startups
 * Fetches all startups from the database
 */
export async function GET(request: NextRequest) {
	const result = await safeHandler(async () => {
		const searchParams = request.nextUrl.searchParams;
		const limit = parseInt(searchParams.get("limit") || "100", 10);
		const offset = parseInt(searchParams.get("offset") || "0", 10);

		// Fetch startups with their metrics
		const startups = await prisma.databaseConnection.findMany({
			where: {
				startupName: {
					not: "", // Only get startups with names
				},
			},
			select: {
				id: true,
				startupName: true,
				tagline: true,
				logo: true,
				founderName: true,
				founderHandle: true,
				founderAvatar: true,
				totalUsers: true,
				category: true,
				updatedAt: true,
			},
			orderBy: [
				{ totalUsers: "desc" }, // Sort by total users descending
				{ updatedAt: "desc" }, // Then by most recently updated
			],
			take: limit,
			skip: offset,
		});

		// Calculate metrics for each startup
		const formattedStartups = await Promise.all(
			startups.map(async (startup) => {
				// Calculate monthly growth rate (with timeout to avoid blocking)
				let monthlyGrowthRate: number | null = null;
				let newSignups30d: number = 0;
				try {
					const client = await createClientFromConnectionId(startup.id);
					try {
						await client.connect();
						const [growthRate, newSignups] = await Promise.all([
							Promise.race([
								getGrowthRates(client),
								new Promise<null>((resolve) =>
									setTimeout(() => resolve(null), 3000)
								), // 3 second timeout
							]),
							Promise.race([
								getNewSignups(client, 30),
								new Promise<number>((resolve) =>
									setTimeout(() => resolve(0), 3000)
								), // 3 second timeout
							]),
						]);
						monthlyGrowthRate = growthRate;
						newSignups30d = newSignups;
					} catch (error) {
						console.error(
							`Error calculating metrics for ${startup.startupName}:`,
							error
						);
					} finally {
						try {
							await client.end();
						} catch (error) {
							console.error("Error closing connection:", error);
						}
					}
				} catch (error) {
					console.error(
						`Error creating client for ${startup.startupName}:`,
						error
					);
				}

				return {
					id: startup.id,
					name: startup.startupName,
					tagline: startup.tagline || undefined,
					logo: startup.logo || undefined,
					category: startup.category || undefined,
					founder: {
						name: startup.founderName || undefined,
						handle: startup.founderHandle || undefined,
						avatar: startup.founderAvatar || undefined,
					},
					totalUsers: startup.totalUsers,
					newSignups30d: newSignups30d || null,
					conversionRate: null, // No longer calculated (was based on paid users)
					monthlyGrowthRate,
				};
			})
		);

		return {
			startups: formattedStartups,
			total: formattedStartups.length,
		};
	});

	// Add cache headers to response (5 min cache, 10 min stale-while-revalidate)
	result.headers.set(
		"Cache-Control",
		"public, s-maxage=300, stale-while-revalidate=600"
	);

	return result;
}

