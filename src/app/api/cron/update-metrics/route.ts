import { NextRequest } from 'next/server'
import { safeHandler } from '@/utils/safeHandler'
import { updateAllConnections } from '@/lib/db/queries/updateAllConnections'

/**
 * POST /api/cron/update-metrics
 * Manually triggers an update of all database connection metrics
 * Useful for testing the cron job functionality
 * 
 * Query params:
 * - force: Set to "true" to force update even if recently updated
 */
export async function POST(request: NextRequest) {
	return safeHandler(async () => {
		const searchParams = request.nextUrl.searchParams
		const force = searchParams.get('force') === 'true'

		console.log(
			`Manual metrics update triggered${force ? ' (forced)' : ''}`
		)

		const results = await updateAllConnections(5, force)

		const successful = results.filter((r) => r.success).length
		const failed = results.filter((r) => !r.success).length

		// Log failed connections for debugging
		if (failed > 0) {
			const failedConnections = results.filter((r) => !r.success)
			console.error('Failed connections:', failedConnections)
		}

		return {
			message: 'Metrics update completed',
			summary: {
				total: results.length,
				successful,
				failed,
			},
			results: results.map((r) => ({
				connectionId: r.connectionId,
				startupName: r.startupName,
				success: r.success,
				error: r.error,
				totalUsers: r.totalUsers,
				paidUsers: r.paidUsers,
			})),
		}
	})
}

