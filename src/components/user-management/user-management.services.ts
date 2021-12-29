import type { APIGatewayProxyEventPathParameters } from 'aws-lambda'

import * as userManagementDAL from './user-management.dal'
import type { TContext } from 'src/types/context.type'

import type { Connection } from 'typeorm'

export function getUserEvents(
  pathParameters: APIGatewayProxyEventPathParameters,
  connection: Connection,
  ctx: TContext
) {
  const userId = parseInt(pathParameters.userId!, 10)

  return userManagementDAL.getUserEvents(userId, connection, ctx)
}
