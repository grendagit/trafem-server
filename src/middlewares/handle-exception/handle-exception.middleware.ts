import middy from '@middy/core'
import type { APIGatewayProxyResult } from 'aws-lambda'

import { ensureLoggerPresence } from './handle-exception.helpers'
import { formatJSONResponse } from '@helpers/api-gateway'
import type { TContext } from 'src/types/context.type'

export enum EHandlerType {
  API_GATEWAY_PROXY = 'APIGatewayProxy',
}

function APIGatewayProxyHandler(): middy.MiddlewareObj<
  any,
  any,
  Error,
  TContext
> {
  return {
    onError: (
      handler: middy.Request<any, APIGatewayProxyResult, Error, TContext>
    ) => {
      const { context, error } = handler
      context.logger = ensureLoggerPresence(context)

      const { logger } = context
      /**
       * TODO: handle custom and validation exception
       */

      logger.error({
        message: error!.message,
        data: {
          stack: error!.stack,
        },
      })

      handler.response = formatJSONResponse(
        { body: { message: 'Internal Server Error' }, statusCode: 500 },
        context
      )
    },
  }
}

export function handleExceptionMiddleware(
  handlerType: EHandlerType
): middy.MiddlewareObj<any, any, Error, TContext> {
  switch (handlerType) {
    case EHandlerType.API_GATEWAY_PROXY:
      return APIGatewayProxyHandler()
    default:
      throw new Error('Handler type is unknown')
  }
}
