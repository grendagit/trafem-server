import { Event } from 'src/entities'
import type { TContext } from 'src/types/context.type'

import type { Connection } from 'typeorm'

export async function getUserEvents(
  userId: number,
  connection: Connection,
  ctx: TContext
) {
  const { logger } = ctx

  try {
    const eventRepository = connection.getRepository(Event)

    const alias = 'event'

    return await eventRepository.find({
      join: {
        alias,
        innerJoin: {
          end_user: `${alias}.end_user`,
        },
      },
      where: { end_user_id: userId },
    })
  } catch (error) {
    logger.error({
      message: `Failed to get events. Reason ${error.message}`,
    })
    throw error
  }
}
