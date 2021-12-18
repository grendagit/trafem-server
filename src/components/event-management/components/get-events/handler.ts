import type { APIGatewayProxyHandler } from 'aws-lambda'
import middy from '@middy/core'

import { manageGetEvents } from '@components/event-management/event-management.controllers'
import { loadEnvVars } from '@helpers/load-env-vars'
import { getConnection } from '@helpers/get-connection'
import { formatJSONResponse, getCORSHeaders } from '@helpers/api-gateway'
import { APIGatewayProxyHandlerWrapper } from '@wrappers/apigw-proxy-handler.wrapper'
import type { TContext } from 'src/types/context.type'

const envVarsPromise = loadEnvVars({
  CORS_CONFIG: '',
  SECRET_ARN: '',
  RESOURCE_ARN: '',
  REGION: '',
})

const handler: APIGatewayProxyHandler = async (event, ctx: TContext) => {
  const { logger } = ctx

  logger.info({
    message: 'Event',
    data: {
      event,
    },
  })

  const connection = await getConnection(ctx)

  const events = await manageGetEvents(connection, ctx)

  return formatJSONResponse(
    { body: events, headers: getCORSHeaders(event.headers.origin, 'get', ctx) },
    ctx
  )
}

export const execute = APIGatewayProxyHandlerWrapper(middy(handler), {
  envVarsPromise,
  validatorOptions: { inputSchema: {} },
})
