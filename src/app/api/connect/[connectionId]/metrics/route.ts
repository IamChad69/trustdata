import { NextRequest } from 'next/server'
import { safeHandler } from '@/utils/safeHandler'
import { updateConnectionMetrics } from '@/lib/db/queries/updateAllConnections'

/**
 * POST /api/connect/[connectionId]/metrics
 * Fetches and updates metrics for a connection
 */
export async function POST(
	request: NextRequest,
	{ params }: { params: Promise<{ connectionId: string }> }
) {
	return safeHandler(async () => {
		const { connectionId } = await params

		if (!connectionId) {
			throw new Error('Connection ID is required')
		}

		// Fetch metrics with force update to ensure fresh data
		const result = await updateConnectionMetrics(connectionId, true)

		if (!result.success) {
			throw new Error(result.error || 'Failed to fetch metrics')
		}

		return {
			totalUsers: result.totalUsers,
			paidUsers: result.paidUsers,
			startupName: result.startupName,
		}
	})
}

