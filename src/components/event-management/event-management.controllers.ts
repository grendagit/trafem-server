import type { APIGatewayProxyEventQueryStringParameters } from 'aws-lambda'

import * as eventManagementService from './event-management.services'
import type { TContext } from 'src/types/context.type'

import type { Connection } from 'typeorm'

export async function manageGetEvents(
  queryStringParameters: APIGatewayProxyEventQueryStringParameters | null,
  connection: Connection,
  ctx: TContext
) {
  const { logger } = ctx

  const { ['group-by']: groupBy, ['order-by']: orderBy } =
    queryStringParameters || {}

  logger.info({ message: 'Started getting events' })
  try {
    let events
    if (groupBy) {
      events = await eventManagementService.getGroupedEvents(
        groupBy,
        connection,
        ctx
      )
    } else if (orderBy) {
      events = await eventManagementService.getOrderedEvents(
        orderBy,
        connection,
        ctx
      )
    } else {
      events = await eventManagementService.getEvents(connection, ctx)
    }
    logger.info({
      message: 'Getting events has just ended successfuly',
    })
    return events
  } catch (error) {
    logger.error({
      message: 'Getting events is unsuccessful',
    })
    throw error
  }
}
