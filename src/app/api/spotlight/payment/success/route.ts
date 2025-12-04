import { NextRequest, NextResponse } from "next/server";
import { safeHandler } from "@/utils/safeHandler";
import { getStripeSecretKey } from "@/utils/env";
import { prisma } from "@/lib/db";
import { revalidateTag } from "next/cache";
import Stripe from "stripe";

const stripe = new Stripe(getStripeSecretKey(), {
  apiVersion: "2025-11-17.clover",
  typescript: true,
});

/**
 * GET /api/spotlight/payment/success
 * Handles successful payment and redirects to add startup form with session_id
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.redirect(new URL("/?error=no_session", request.url));
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session || session.payment_status !== "paid") {
      return NextResponse.redirect(
        new URL("/?error=payment_not_confirmed", request.url)
      );
    }

    // Redirect to the add startup page with the session_id
    return NextResponse.redirect(
      new URL(`/add-spotlight?session_id=${sessionId}`, request.url)
    );
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.redirect(
      new URL("/?error=verification_failed", request.url)
    );
  }
}

/**
 * POST /api/spotlight/payment/success
 * Creates a spotlight after successful payment verification
 */
export async function POST(request: NextRequest) {
  return safeHandler(async () => {
    const body = await request.json();
    const { sessionId, name, tagline, url, logo } = body;

    if (!sessionId || !name || !tagline || !url) {
      throw new Error("Missing required fields");
    }

    // Verify payment session
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session || session.payment_status !== "paid") {
      throw new Error("Payment not confirmed");
    }

    // Check if spotlight was already created for this session
    const existingSpotlight = await prisma.spotlight.findFirst({
      where: {
        stripeSessionId: sessionId,
      },
    });

    if (existingSpotlight) {
      throw new Error("Spotlight already created for this payment");
    }

    // Validate URL format
    const urlToSave = url.trim().startsWith("http")
      ? url.trim()
      : `https://${url.trim()}`;

    if (!/^https?:\/\/.+/.test(urlToSave)) {
      throw new Error(
        "URL must be a valid URL (starting with http:// or https://)"
      );
    }

    // Calculate expiry date (1 month from now)
    const expiresAt = new Date();
    expiresAt.setMonth(expiresAt.getMonth() + 1);

    // Get the next position
    const lastSpotlight = await prisma.spotlight.findFirst({
      orderBy: { position: "desc" },
    });
    const nextPosition = lastSpotlight?.position
      ? lastSpotlight.position + 1
      : 1;

    // Create spotlight with payment info
    const spotlight = await prisma.spotlight.create({
      data: {
        name: name.trim(),
        tagline: tagline.trim(),
        url: urlToSave,
        logo: logo?.trim() || null,
        position: nextPosition,
        isActive: true,
        expiresAt,
        stripeSessionId: sessionId,
        stripePaymentIntentId: session.payment_intent as string | null,
        paymentAmount: session.amount_total || null,
        paidAt: new Date(),
      },
    });

    // Revalidate cache to show new spotlight immediately
    revalidateTag("spotlights");

    return spotlight;
  });
}
