import { Event } from 'src/entities'
import type { TContext } from 'src/types/context.type'
import type { TGetEventsReturnDAL } from './event-management.types'

import type { Connection } from 'typeorm'

export async function getEvents(connection: Connection, ctx: TContext) {
  const { logger } = ctx

  try {
    const eventRepository = connection.getRepository(Event)
    const queryBuilder = await eventRepository.createQueryBuilder('event')

    const { alias } = queryBuilder
    const groupBy = 'event_type'
    /**
     * returns JSON, where keys are event types, while the value associated with the key is an array of events with that event type
     */
    const groupedEvents = await queryBuilder
      .select(`${alias}.${groupBy}`, 'type')
      .addSelect(`json_agg(${alias})`, 'events')
      .groupBy(`${alias}.${groupBy}`)
      .getRawMany()
    const latestEvents = await eventRepository.find({
      order: { created_at: 'DESC' },
    })

    return {
      groupedEvents,
      latestEvents,
    } as TGetEventsReturnDAL
  } catch (error) {
    logger.error({
      message: `Failed to get events. Reason ${error.message}`,
    })
    throw error
  }
}
