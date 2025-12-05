import { NextRequest } from "next/server";
import { safeHandler } from "@/utils/safeHandler";
import { getStripeSecretKey, getBaseUrl } from "@/utils/env";
import Stripe from "stripe";

interface CreatePaymentRequest {
  amount: number; // Amount in cents
}

/**
 * POST /api/spotlight/payment
 * Creates a Stripe Checkout session for spotlight payment
 */
export async function POST(request: NextRequest) {
  return safeHandler(async () => {
    // Check if Stripe key is configured
    let stripeSecretKey: string;
    try {
      stripeSecretKey = getStripeSecretKey();
    } catch {
      throw new Error(
        "Stripe is not configured. Please set STRIPE_SECRET_KEY environment variable."
      );
    }

    // Initialize Stripe client inside handler to catch errors
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2025-11-17.clover",
      typescript: true,
    });

    const body: CreatePaymentRequest = await request.json();

    if (!body.amount || body.amount <= 0) {
      throw new Error("Invalid payment amount");
    }

    const baseUrl = getBaseUrl();

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "TrustdB Spotlight - One-time Advance",
                description: "Secure your spotlight position for 1 month",
              },
              unit_amount: body.amount,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${baseUrl}/api/spotlight/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/?canceled=true`,
        metadata: {
          type: "spotlight_payment",
        },
      });

      if (!session.url) {
        throw new Error(
          "Failed to create Stripe checkout session - no URL returned"
        );
      }

      return {
        url: session.url,
        sessionId: session.id,
      };
    } catch (error: unknown) {
      if (error instanceof Stripe.errors.StripeError) {
        throw new Error(`Stripe error: ${error.message}`);
      }
      throw new Error("An unknown error occurred");
    }
  });
}
