import { NextResponse } from "next/server";

export interface ApiError {
  message: string;
  code?: string;
  details?: unknown;
}

/**
 * Standardized error response format
 */
export function createErrorResponse(
  message: string,
  status: number = 500,
  code?: string,
  details?: unknown
): NextResponse<ApiError> {
  return NextResponse.json(
    {
      message,
      code,
      details,
    },
    { status }
  );
}

/**
 * Success response helper
 */
export function createSuccessResponse<T>(
  data: T,
  status: number = 200
): NextResponse<{ success: true; data: T }> {
  return NextResponse.json({ success: true, data }, { status });
}

/**
 * Wrapper for API route handlers that provides standardized error handling
 */
export function safeHandler<T>(
  handler: () => Promise<T> | T
): Promise<NextResponse<{ success: true; data: T } | ApiError>> {
  return Promise.resolve()
    .then(() => handler())
    .then((data) => createSuccessResponse(data))
    .catch((error) => {
      console.error("API Error:", error);

      // Handle known error types
      if (error instanceof Error) {
        // Validation errors
        if (error.message.includes("required") || error.message.includes("invalid")) {
          return createErrorResponse(error.message, 400, "VALIDATION_ERROR");
        }

        // Database errors
        if (
          error.message.includes("Unique constraint") ||
          error.message.includes("duplicate")
        ) {
          return createErrorResponse(
            "A record with this information already exists",
            409,
            "DUPLICATE_ERROR"
          );
        }

        // Connection errors
        if (
          error.message.includes("connection") ||
          error.message.includes("ECONNREFUSED") ||
          error.message.includes("timeout")
        ) {
          return createErrorResponse(
            "Failed to connect to database. Please check your connection string.",
            400,
            "CONNECTION_ERROR"
          );
        }

        // Authentication errors
        if (
          error.message.includes("password") ||
          error.message.includes("authentication") ||
          error.message.includes("credentials")
        ) {
          return createErrorResponse(
            "Invalid database credentials",
            401,
            "AUTH_ERROR"
          );
        }

        // Generic error
        return createErrorResponse(
          error.message || "An unexpected error occurred",
          500,
          "INTERNAL_ERROR"
        );
      }

      // Unknown error type
      return createErrorResponse(
        "An unexpected error occurred",
        500,
        "UNKNOWN_ERROR",
        isProduction() ? undefined : error
      );
    });
}

/**
 * Check if we're in production (for error details)
 */
function isProduction(): boolean {
  return process.env.NODE_ENV === "production";
}

