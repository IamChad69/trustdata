import { inngest } from './client'
import { updateAllConnections } from '@/lib/db/queries/updateAllConnections'

/**
 * Scheduled function that runs every 3 hours to update metrics
 * for all database connections
 */
export const updateDatabaseMetrics = inngest.createFunction(
	{
		id: 'update-database-metrics',
		name: 'Update Database Metrics',
	},
	{
		cron: '0 */3 * * *', // Every 3 hours at minute 0 (12:00 AM, 3:00 AM, 6:00 AM, 9:00 AM, 12:00 PM, 3:00 PM, 6:00 PM, 9:00 PM)
	},
	async ({ step }) => {
		const results = await step.run('update-all-connections', async () => {
			console.log('Starting scheduled database metrics update')
			// Force update on schedule to ensure fresh data
			return await updateAllConnections(5, true) // Process 5 connections in parallel, force update
		})

		// Log summary
		const successful = results.filter((r) => r.success).length
		const failed = results.filter((r) => !r.success).length

		await step.run('log-summary', async () => {
			console.log(
				`Scheduled update complete: ${successful} successful, ${failed} failed out of ${results.length} total`
			)

			// Log failed connections for debugging
			if (failed > 0) {
				const failedConnections = results.filter((r) => !r.success)
				console.error('Failed connections:', failedConnections)
			}

			return {
				total: results.length,
				successful,
				failed,
			}
		})

		return {
			success: true,
			total: results.length,
			successful,
			failed,
		}
	}
)

