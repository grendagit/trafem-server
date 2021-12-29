import { Event } from 'src/entities'
import type { TContext } from 'src/types/context.type'
import type { TGroupedEvent } from './event-management.types'

import type { Connection } from 'typeorm'

export async function getEvents(connection: Connection, ctx: TContext) {
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

export async function getOrderedEvents(
  orderBy: string,
  connection: Connection,
  ctx: TContext
) {
  const { logger } = ctx

  try {
    const eventRepository = connection.getRepository(Event)

    return await eventRepository.find({
      order: { [orderBy]: 'DESC' },
    })
  } catch (error) {
    logger.error({
      message: `Failed to get ordered events. Reason ${error.message}`,
    })
    throw error
  }
}

export async function getGroupedEvents(
  groupBy: string,
  connection: Connection,
  ctx: TContext
) {
  const { logger } = ctx

  try {
    const eventRepository = connection.getRepository(Event)
    const queryBuilder = await eventRepository.createQueryBuilder('event')

    const { alias } = queryBuilder
    /**
     * returns JSON, where keys are event types, while the value associated with the key is an array of events with that event type
     */
    return (await queryBuilder
      .select(`${alias}.${groupBy}`, 'type')
      .addSelect(`json_agg(${alias})`, 'events')
      .groupBy(`${alias}.${groupBy}`)
      .getRawMany()) as TGroupedEvent[]
  } catch (error) {
    logger.error({
      message: `Failed to get grouped events. Reason ${error.message}`,
    })
    throw error
  }
}
