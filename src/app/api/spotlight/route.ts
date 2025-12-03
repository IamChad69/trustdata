import { NextRequest } from "next/server";
import { safeHandler } from "@/utils/safeHandler";
import { prisma } from "@/lib/db";

interface CreateSpotlightRequest {
  name: string;
  tagline: string;
  url: string;
  logo?: string;
}

/**
 * GET /api/spotlight
 * Gets all active spotlight startups (not expired)
 * Returns up to 20 active spotlights
 */
export async function GET() {
  return safeHandler(async () => {
    const now = new Date();

    const spotlights = await prisma.spotlight.findMany({
      where: {
        isActive: true,
        OR: [{ expiresAt: null }, { expiresAt: { gt: now } }],
      },
      orderBy: [{ position: "asc" }, { createdAt: "desc" }],
      take: 20,
    });

    return spotlights;
  });
}

/**
 * POST /api/spotlight
 * Creates a new spotlight startup
 */
export async function POST(request: NextRequest) {
  return safeHandler(async () => {
    const body: CreateSpotlightRequest = await request.json();

    // Validate required fields
    if (!body.name?.trim()) {
      throw new Error("Startup name is required");
    }
    if (!body.tagline?.trim()) {
      throw new Error("Tagline is required");
    }
    if (!body.url?.trim()) {
      throw new Error("URL is required");
    }

    // Validate URL format
    const urlToSave = body.url.trim().startsWith("http")
      ? body.url.trim()
      : `https://${body.url.trim()}`;

    if (!/^https?:\/\/.+/.test(urlToSave)) {
      throw new Error(
        "URL must be a valid URL (starting with http:// or https://)"
      );
    }

    // Get the next position (highest position + 1, or 1 if none exist)
    const lastSpotlight = await prisma.spotlight.findFirst({
      orderBy: { position: "desc" },
    });
    const nextPosition = lastSpotlight?.position
      ? lastSpotlight.position + 1
      : 1;

    // Create spotlight (free spotlights are active by default)
    const spotlight = await prisma.spotlight.create({
      data: {
        name: body.name.trim(),
        tagline: body.tagline.trim(),
        url: urlToSave,
        logo: body.logo?.trim() || null,
        position: nextPosition,
        isActive: true,
      },
    });

    return spotlight;
  });
}
