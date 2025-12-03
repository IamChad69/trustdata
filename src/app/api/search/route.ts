import { NextRequest } from "next/server";
import { safeHandler } from "@/utils/safeHandler";
import { prisma } from "@/lib/db";

/**
 * GET /api/search?q=query
 * Searches startups by name
 */
export async function GET(request: NextRequest) {
	return safeHandler(async () => {
		const searchParams = request.nextUrl.searchParams;
		const query = searchParams.get("q")?.trim() || "";

		if (!query || query.length < 2) {
			return {
				results: [],
			};
		}

		// Search startups by name (case-insensitive, partial match)
		const startups = await prisma.databaseConnection.findMany({
			where: {
				startupName: {
					not: "",
					contains: query,
					mode: "insensitive",
				},
			},
			select: {
				startupName: true,
				slug: true,
				logo: true,
			},
			take: 10, // Limit to 10 results
			orderBy: {
				startupName: "asc",
			},
		});

		return {
			results: startups,
		};
	});
}

