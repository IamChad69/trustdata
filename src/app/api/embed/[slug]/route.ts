import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { getGrowthRates } from "@/lib/db/queries/getGrowthRates";
import { createClientFromConnectionId } from "@/lib/db/queries/createClient";

interface EmbedParams {
  params: Promise<{ slug: string }>;
}

/**
 * GET /api/embed/[slug]?format=svg
 * Generates an SVG badge for a startup
 */
export async function GET(request: NextRequest, { params }: EmbedParams) {
  try {
    const { slug } = await params;

    // Find startup by slug
    const startup = await prisma.databaseConnection.findUnique({
      where: { slug },
      select: {
        id: true,
        startupName: true,
        totalUsers: true,
      },
    });

    if (!startup) {
      return new Response("Startup not found", { status: 404 });
    }

    // Try to get growth rate from database connection
    // For performance, we'll calculate it on-demand but don't block if it fails
    // The badge will still work without growth rate
    let growth: number | null = null;
    try {
      const client = await createClientFromConnectionId(startup.id);
      await client.connect();
      growth = await getGrowthRates(client);
      await client.end();
    } catch {
      // Silently fail - badge will show without growth rate
      // This is expected if database is slow or unavailable
    }

    // Format numbers
    const users = startup.totalUsers || 0;
    const growthFormatted =
      growth !== null ? `${growth > 0 ? "+" : ""}${growth.toFixed(1)}%` : null;

    // Generate SVG
    const svg = generateBadgeSVG(users, growthFormatted, growth);

    // Return SVG with proper headers
    return new Response(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=300, s-maxage=300",
      },
    });
  } catch (error) {
    console.error("Error generating embed badge:", error);
    return new Response("Error generating badge", { status: 500 });
  }
}

function generateBadgeSVG(
  users: number,
  growthFormatted: string | null,
  growth: number | null
): string {
  const width = 320;
  const height = 60;
  const logoSize = 60;
  const logoBgColor = "#e03d26";
  const bgColor = "#ffffff";
  const borderColor = "#e5e7eb";
  const textColor = "#1f2937";
  const mutedColor = "#6b7280";
  const greenColor = "#16a34a";
  const redColor = "#ef4444";

  // Determine arrow and color based on growth
  let arrowSvg = "";
  let growthColor = mutedColor;
  let arrowX = 0;
  let growthX = 0;

  if (growth !== null && growthFormatted) {
    if (growth > 0) {
      // Up arrow - matching lucide-react ArrowUp icon
      arrowSvg = `<path d="M5 12l7-7 7 7M12 19V5" stroke="${greenColor}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`;
      growthColor = greenColor;
      arrowX = 0;
      growthX = 20;
    } else if (growth < 0) {
      // Down arrow - matching lucide-react ArrowDown icon
      arrowSvg = `<path d="M12 5v14m0 0l-7-7m7 7l7-7" stroke="${redColor}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`;
      growthColor = redColor;
      arrowX = 0;
      growthX = 20;
    } else {
      // Zero growth - no arrow
      growthX = 0;
    }
  }

  // Logo SVG path from logo-icon.svg
  // Original viewBox: 0 0 454.74 320.23
  // The logo path fills white (#FFFFFF) on the red background
  const logoPath = `<path d="M446.9,15.87c-4.69,3.52-9.58,7.43-14.66,11.53c-30.49,25.01-65.66,59.61-100.65,96.15c-8.99,9.38-17.59,18.76-26.38,28.14c-7.82,8.4-15.44,16.81-22.67,25.01c-2.93,3.13-5.86,6.25-8.6,9.38c-5.47,6.25-10.95,12.12-16.03,18.17c-0.59,0.59-1.17,1.37-1.95,2.15c-28.92,33.03-54.33,63.51-72.9,85.4c-0.2,0.39-0.59,0.59-0.98,0.98c-9.96,12.51-18.18,22.08-23.06,28.34c-3.32,3.91-9.38,3.91-12.51,0.2l-20.33-24.43l-1.17-1.17l-47.49-56.87l-10.16-12.12l-15.64-18.76L31.8,184.14L2.1,148.57c-4.69-5.08-0.98-13.09,5.86-13.09h84.23c2.35,0,4.49,0.98,6.06,2.74l20.13,23.26l9.38,10.75l13.09,15.24c3.13,3.52,8.6,3.52,11.92,0c9.77-10.16,19.54-19.93,28.73-29.12c1.56-1.37,2.93-2.93,4.49-4.1c0.78-0.98,1.56-1.76,2.34-2.54c24.23-23.06,47.1-42.99,68.6-59.41c55.7-43.39,103.77-67.03,145.79-80.71c13.29-4.3,25.8-7.62,37.91-10.16C460.38-3.09,463.31,3.56,446.9,15.87z" fill="#FFFFFF"/>`;

  // Calculate logo scaling and positioning
  // Original SVG dimensions: 454.74 x 320.23
  // Target size: ~40px height, centered in 60px area
  const logoTargetHeight = 40;
  const logoScale = logoTargetHeight / 320.23;
  const logoScaledWidth = 454.74 * logoScale;
  const logoX = (logoSize - logoScaledWidth) / 2;
  const logoY = (height - logoTargetHeight) / 2;

  const growthSection = growthFormatted
    ? `
    <g transform="translate(70, 10)">
      ${
        arrowSvg ? `<g transform="translate(${arrowX}, 0)">${arrowSvg}</g>` : ""
      }
      <text x="${growthX}" y="16" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="600" fill="${growthColor}">
        ${growthFormatted}
      </text>
    </g>
  `
    : "";

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
  <defs>
    <style>
      .badge-text { font-family: system-ui, -apple-system, sans-serif; }
    </style>
  </defs>
  
  <!-- Background -->
  <rect width="${width}" height="${height}" fill="${bgColor}" stroke="${borderColor}" stroke-width="1" rx="6"/>
  
  <!-- Logo background -->
  <rect x="0" y="0" width="${logoSize}" height="${height}" fill="${logoBgColor}" rx="6 0 0 6"/>
  
  <!-- Logo icon from logo-icon.svg (centered and scaled) -->
  <g transform="translate(${logoX}, ${logoY}) scale(${logoScale})">
    ${logoPath}
  </g>
  
  <!-- Content area -->
  <g transform="translate(0, 0)">
    ${growthSection}
    
    <!-- Users text -->
    <text x="70" y="48" font-family="system-ui, -apple-system, sans-serif" font-size="11" fill="${mutedColor}">
      based on <tspan font-weight="600" fill="${textColor}">${users.toLocaleString()}</tspan> verified users
    </text>
  </g>
</svg>`;
}
