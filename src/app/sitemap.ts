import { MetadataRoute } from "next";
import { prisma } from "@/lib/db";

function getBaseUrl(): string {
	if (process.env.NEXT_PUBLIC_APP_URL) {
		return process.env.NEXT_PUBLIC_APP_URL;
	}
	if (process.env.VERCEL_URL) {
		return `https://${process.env.VERCEL_URL}`;
	}
	return "http://localhost:3000";
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = getBaseUrl();

	// Get all startups with slugs
	const startups = await prisma.databaseConnection.findMany({
		where: {
			slug: {
				not: null,
			},
		},
		select: {
			slug: true,
			updatedAt: true,
		},
	});

	// Base routes
	const routes = [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: "daily" as const,
			priority: 1.0,
		},
	];

	// Add startup pages
	const startupPages = startups.map((startup) => ({
		url: `${baseUrl}/startup/${startup.slug}`,
		lastModified: startup.updatedAt,
		changeFrequency: "weekly" as const,
		priority: 0.8,
	}));

	return [...routes, ...startupPages];
}

