import type { APIGatewayProxyEventPathParameters } from 'aws-lambda'

import * as userManagementService from './user-management.services'
import type { TContext } from 'src/types/context.type'

import type { Connection } from 'typeorm'

export async function manageGetUserEvents(
  pathParameters: APIGatewayProxyEventPathParameters,
  connection: Connection,
  ctx: TContext
) {
  const { logger } = ctx

  logger.info({ message: 'Started getting user events' })
  try {
    const userEvents = await userManagementService.getUserEvents(
      pathParameters,
      connection,
      ctx
    )
    logger.info({
      message: 'Getting user events has just ended successfuly',
      data: {
        userEvents,
      },
    })
    return userEvents
  } catch (error) {
    logger.error({
      message: 'Getting user events is unsuccessful',
    })
    throw error
  }
}
