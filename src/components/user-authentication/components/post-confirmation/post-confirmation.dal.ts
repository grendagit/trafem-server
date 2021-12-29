import { EndUser } from 'src/entities'
import type { TContext } from 'src/types/context.type'
import type { TEndUserData } from './post-confirmation.types'

import type { Connection } from 'typeorm'

export async function createEndUser(
  endUserData: TEndUserData,
  connection: Connection,
  ctx: TContext
) {
  const { logger } = ctx

  try {
    const endUserRepository = connection.getRepository(EndUser)
    const endUser = EndUser.create(endUserData)

    return await endUserRepository.save(endUser)
  } catch (error) {
    logger.error({
      message: `Failed to create end user. Reason ${error.message}`,
    })
    throw error
  }
}
