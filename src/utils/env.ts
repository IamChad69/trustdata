/**
 * Centralized environment variable access with validation
 */

function getEnv(key: string, defaultValue?: string): string {
  const value = process.env[key];
  if (!value && defaultValue === undefined) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value || defaultValue!;
}

/**
 * Get the encryption key for credential encryption
 */
export function getEncryptionKey(): string {
  const key = getEnv("ENCRYPTION_KEY");
  if (key.length < 32) {
    throw new Error(
      "ENCRYPTION_KEY must be at least 32 characters long for AES-256"
    );
  }
  return key;
}

/**
 * Get the database URL for Prisma
 */
export function getDatabaseUrl(): string {
  return getEnv("DATABASE_URL");
}

/**
 * Get Node environment
 */
export function getNodeEnv(): "development" | "production" | "test" {
  return getEnv("NODE_ENV", "development") as
    | "development"
    | "production"
    | "test";
}

/**
 * Check if we're in production
 */
export function isProduction(): boolean {
  return getNodeEnv() === "production";
}

/**
 * Get the base URL for the application
 * Uses NEXT_PUBLIC_BASE_URL if set, otherwise falls back to localhost in development
 * or derives from request headers in production
 */
export function getBaseUrl(): string {
  // Check for explicit base URL in environment
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL;
  }

  // In production, try to get from VERCEL_URL (if on Vercel)
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // Fallback for development
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }

  // Last resort - this should be set in production
  throw new Error("NEXT_PUBLIC_BASE_URL must be set in production environment");
}

/**
 * Get base URL for client-side usage
 * This uses NEXT_PUBLIC_BASE_URL or falls back to window.location.origin
 */
export function getClientBaseUrl(): string {
  // In browser, use window.location.origin as fallback
  if (typeof window !== "undefined") {
    return process.env.NEXT_PUBLIC_BASE_URL || window.location.origin;
  }

  // Server-side, use the server function
  return getBaseUrl();
}

/**
 * Get Stripe secret key
 */
export function getStripeSecretKey(): string {
  return getEnv("STRIPE_SECRET_KEY");
}

/**
 * Get Stripe publishable key
 */
export function getStripePublishableKey(): string {
  return getEnv("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY");
}
