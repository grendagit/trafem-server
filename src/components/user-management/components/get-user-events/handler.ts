import type { APIGatewayProxyHandler } from 'aws-lambda'
import middy from '@middy/core'

import { manageGetUserEvents } from '@components/user-management/user-management.controller'
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

  const { pathParameters } = event

  logger.info({
    message: 'Event',
    data: {
      event,
    },
  })

  const connection = await getConnection(ctx)

  const userEvents = await manageGetUserEvents(pathParameters!, connection, ctx)

  return formatJSONResponse(
    {
      body: userEvents,
      headers: getCORSHeaders(event.headers.origin, 'get', ctx),
    },
    ctx
  )
}

export const execute = APIGatewayProxyHandlerWrapper(middy(handler), {
  envVarsPromise,
  validatorOptions: { inputSchema: {} },
})
