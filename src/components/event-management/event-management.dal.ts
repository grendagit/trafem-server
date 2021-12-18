import { Event } from 'src/entities'
import type { TContext } from 'src/types/context.type'

import type { Connection } from 'typeorm'

export async function getEvents(
  connection: Connection,
  ctx: TContext
): Promise<Event[]> {
  const { logger } = ctx

  try {
    const eventRepository = connection.getRepository(Event)
    return await eventRepository.find()
  } catch (error) {
    logger.error({
      message: `Failed to get events. Reason ${error.message}`,
    })
    throw error
  }
}
