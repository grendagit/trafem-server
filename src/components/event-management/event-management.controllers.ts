import * as eventManagementService from './event-management.services'
import type { TContext } from 'src/types/context.type'

import type { Connection } from 'typeorm'

export async function manageGetEvents(connection: Connection, ctx: TContext) {
  const { logger } = ctx

  logger.info({ message: 'Started getting events' })
  try {
    const events = await eventManagementService.getEvents(connection, ctx)
    logger.info({
      message: 'Getting events has just ended successfuly',
      data: {
        events,
      },
    })
    return events
  } catch (error) {
    logger.error({
      message: 'Getting events is unsuccessful',
    })
    throw error
  }
}
