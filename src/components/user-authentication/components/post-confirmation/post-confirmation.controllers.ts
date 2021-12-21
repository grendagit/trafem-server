import type { PostConfirmationTriggerEvent } from 'aws-lambda'

import * as postConfirmationServices from './post-confirmation.services'
import type { TContext } from 'src/types/context.type'

import type { Connection } from 'typeorm'

export async function setUpEndUser(
  event: PostConfirmationTriggerEvent,
  connection: Connection,
  ctx: TContext
): Promise<void> {
  const { logger } = ctx

  const {
    request: { userAttributes },
  } = event

  logger.info({
    message: 'Started creating setting up end user',
    data: {
      userAttributes,
    },
  })
  try {
    const endUser = await postConfirmationServices.createEndUser(
      userAttributes,
      connection,
      ctx
    )
    const endUserProfile = await postConfirmationServices.createEndUserProfile(
      endUser,
      userAttributes,
      connection,
      ctx
    )
    logger.info({
      message: 'Setting up end user has just ended successfuly',
      data: {
        endUser,
        endUserProfile,
      },
    })
  } catch (error) {
    /**
     * TODO: rollback
     */
    logger.error({
      message: 'Setting up end user is unsuccessful',
    })
    throw error
  }
}
