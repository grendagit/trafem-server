import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from 'aws-lambda'
import type { FromSchema } from 'json-schema-to-ts'

import type { TContext } from 'src/types/context.type'
import type { Generic } from 'src/types/generic.type'

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & {
  body: FromSchema<S>
}
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<
  ValidatedAPIGatewayProxyEvent<S>,
  APIGatewayProxyResult
>

export const formatJSONResponse = (response: Generic, ctx: TContext) => {
  const { logger } = ctx

  logger.info({
    message: 'Lambda response',
    data: {
      response,
    },
  })
  return {
    statusCode: 200,
    body: JSON.stringify(response),
  }
}
