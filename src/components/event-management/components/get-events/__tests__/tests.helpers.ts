import type { Context, APIGatewayProxyEvent } from 'aws-lambda'

import { logger } from '@middlewares/load-logger'
import type { TContext } from 'src/types/context.type'
import type { Generic } from 'src/types/generic.type'

export function noop() {}

export function prepareContext() {
  return {} as Context
}

export function loadLogger(generic: Generic) {
  generic.logger = logger
  return generic as TContext
}

export function prepareEvent(
  pathParameters?: APIGatewayProxyEvent['pathParameters'],
  queryStringParameters?: APIGatewayProxyEvent['queryStringParameters'],
  body?: APIGatewayProxyEvent['body'],
  headers?: APIGatewayProxyEvent['headers']
) {
  return {
    body,
    pathParameters,
    queryStringParameters,
    headers: {
      origin: 'originMock',
      ...headers,
    } as APIGatewayProxyEvent['headers'],
  } as APIGatewayProxyEvent
}
