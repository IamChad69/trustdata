import { Client } from 'pg'
import { prisma } from '@/lib/db'
import { createClientFromConnectionId } from './createClient'
import { getUserCount } from './getUserCount'
import { getActivePaidUsers } from './getActivePaidUsers'
import {
	wasRecentlyUpdated,
	markAsUpdated,
	clearUpdateCache,
	CACHE_TTL,
} from '@/lib/cache'

interface UpdateResult {
	connectionId: string
	startupName: string
	success: boolean
	error?: string
	totalUsers?: number | null
	paidUsers?: number | null
}

/**
 * Updates metrics for a single database connection
 * Uses cache to avoid unnecessary updates if recently fetched
 * @param connectionId - The database connection ID
 * @param forceUpdate - Force update even if recently updated (default: false)
 * @returns Update result with success status and metrics
 */
export async function updateConnectionMetrics(
	connectionId: string,
	forceUpdate: boolean = false
): Promise<UpdateResult> {
	try {
		// Check cache first - skip if recently updated (unless forced)
		if (!forceUpdate && wasRecentlyUpdated(connectionId)) {
			console.log(
				`Skipping update for ${connectionId} - recently updated (within ${CACHE_TTL.CONNECTION_UPDATE}s)`
			)

			// Return cached data from database
			const connection = await prisma.databaseConnection.findUnique({
				where: { id: connectionId },
				select: {
					startupName: true,
					totalUsers: true,
					paidUsers: true,
				},
			})

			if (!connection) {
				return {
					connectionId,
					startupName: 'Unknown',
					success: false,
					error: 'Connection not found',
				}
			}

			return {
				connectionId,
				startupName: connection.startupName,
				success: true,
				totalUsers: connection.totalUsers,
				paidUsers: connection.paidUsers,
			}
		}

		// Get connection from database
		const connection = await prisma.databaseConnection.findUnique({
			where: { id: connectionId },
		})

		if (!connection) {
			return {
				connectionId,
				startupName: 'Unknown',
				success: false,
				error: 'Connection not found',
			}
		}

		// Create database client
		const client = await createClientFromConnectionId(connectionId)

		try {
			// Connect to database
			await client.connect()

			// Fetch metrics in parallel
			const [totalUsers, paidUsers] = await Promise.all([
				getUserCount(client),
				getActivePaidUsers(client),
			])

			// Update connection with latest metrics
			await prisma.databaseConnection.update({
				where: { id: connectionId },
				data: {
					totalUsers,
					paidUsers,
					updatedAt: new Date(),
				},
			})

			// Mark as updated in cache
			markAsUpdated(connectionId)

			return {
				connectionId,
				startupName: connection.startupName,
				success: true,
				totalUsers,
				paidUsers,
			}
		} finally {
			// Always close the client connection
			try {
				await client.end()
			} catch (error) {
				console.error(
					`Error closing database connection for ${connectionId}:`,
					error
				)
			}
		}
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : 'Unknown error'
		console.error(
			`Error updating metrics for connection ${connectionId}:`,
			errorMessage
		)

		// Try to get startup name for error reporting
		let startupName = 'Unknown'
		try {
			const connection = await prisma.databaseConnection.findUnique({
				where: { id: connectionId },
				select: { startupName: true },
			})
			if (connection) {
				startupName = connection.startupName
			}
		} catch {
			// Ignore errors when fetching startup name
		}

		return {
			connectionId,
			startupName,
			success: false,
			error: errorMessage,
		}
	}
}

/**
 * Updates metrics for all database connections
 * Processes connections in batches to avoid overwhelming the system
 * Uses cache to skip recently updated connections
 * @param batchSize - Number of connections to process in parallel (default: 5)
 * @param forceUpdate - Force update even if recently updated (default: false)
 * @returns Array of update results for each connection
 */
export async function updateAllConnections(
	batchSize: number = 5,
	forceUpdate: boolean = false
): Promise<UpdateResult[]> {
	try {
		// Get all database connections
		const connections = await prisma.databaseConnection.findMany({
			select: {
				id: true,
				startupName: true,
			},
		})

		if (connections.length === 0) {
			console.log('No database connections found to update')
			return []
		}

		console.log(
			`Starting update for ${connections.length} database connections`
		)

		const results: UpdateResult[] = []

		// Process connections in batches
		for (let i = 0; i < connections.length; i += batchSize) {
			const batch = connections.slice(i, i + batchSize)
			console.log(
				`Processing batch ${Math.floor(i / batchSize) + 1} (${batch.length} connections)`
			)

			// Process batch in parallel
			const batchResults = await Promise.all(
				batch.map((connection) =>
					updateConnectionMetrics(connection.id, forceUpdate)
				)
			)

			results.push(...batchResults)

			// Log batch summary
			const successful = batchResults.filter((r) => r.success).length
			const failed = batchResults.filter((r) => !r.success).length
			console.log(
				`Batch complete: ${successful} successful, ${failed} failed`
			)
		}

		// Log final summary
		const totalSuccessful = results.filter((r) => r.success).length
		const totalFailed = results.filter((r) => !r.success).length
		console.log(
			`Update complete: ${totalSuccessful} successful, ${totalFailed} failed out of ${results.length} total`
		)

		return results
	} catch (error) {
		console.error('Error updating all connections:', error)
		throw error
	}
}

