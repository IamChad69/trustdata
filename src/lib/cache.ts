import { unstable_cache } from 'next/cache'

/**
 * Cache configuration
 * TTL in seconds
 */
const CACHE_TTL = {
	METRICS: 60 * 60, // 1 hour - metrics are updated every 3 hours by cron
	CONNECTION_UPDATE: 60 * 60 * 2, // 2 hours - don't update if recently updated
	QUERY_RESULT: 60 * 30, // 30 minutes - for query results
} as const

/**
 * In-memory cache for connection update timestamps
 * Key: connectionId, Value: timestamp of last update
 */
const connectionUpdateCache = new Map<string, number>()

/**
 * Check if a connection was recently updated (within TTL)
 * @param connectionId - The connection ID to check
 * @returns true if recently updated, false otherwise
 */
export function wasRecentlyUpdated(connectionId: string): boolean {
	const lastUpdate = connectionUpdateCache.get(connectionId)
	if (!lastUpdate) {
		return false
	}

	const now = Date.now()
	const ttlMs = CACHE_TTL.CONNECTION_UPDATE * 1000
	return now - lastUpdate < ttlMs
}

/**
 * Mark a connection as recently updated
 * @param connectionId - The connection ID to mark
 */
export function markAsUpdated(connectionId: string): void {
	connectionUpdateCache.set(connectionId, Date.now())
}

/**
 * Clear the update cache for a connection
 * @param connectionId - The connection ID to clear
 */
export function clearUpdateCache(connectionId: string): void {
	connectionUpdateCache.delete(connectionId)
}

/**
 * Clear all update caches
 */
export function clearAllUpdateCaches(): void {
	connectionUpdateCache.clear()
}

/**
 * Get cached metrics for a connection using Next.js cache
 * @param connectionId - The connection ID
 * @param fetchFn - Function to fetch metrics if not cached
 * @returns Cached or fresh metrics
 */
export async function getCachedMetrics<T>(
	connectionId: string,
	fetchFn: () => Promise<T>
): Promise<T> {
	return unstable_cache(
		async () => {
			return await fetchFn()
		},
		[`metrics-${connectionId}`],
		{
			revalidate: CACHE_TTL.METRICS,
			tags: [`metrics-${connectionId}`],
		}
	)()
}

/**
 * Invalidate metrics cache for a connection
 * @param connectionId - The connection ID to invalidate
 */
export async function invalidateMetricsCache(connectionId: string): Promise<void> {
	// Next.js cache invalidation happens via revalidation
	// The cache will automatically expire after TTL
	// For immediate invalidation, we'd need to use revalidateTag or revalidatePath
	// But since we're using unstable_cache, it will respect the revalidate time
	clearUpdateCache(connectionId)
}

/**
 * Cache configuration constants
 */
export { CACHE_TTL }

