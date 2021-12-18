import type { APIGatewayProxyResult } from 'aws-lambda'
import middy from '@middy/core'
import validator from '@middy/validator'

import { primaryWrapper } from './primary.wrapper'
import {
  handleExceptionMiddleware,
  EHandlerType,
} from '@middlewares/handle-exception'
import type { TContext } from 'src/types/context.type'

type PrimaryMaterials = {
  envVarsPromise: Promise<void>
  validatorOptions: Parameters<typeof validator>[0]
}

export function APIGatewayProxyHandlerWrapper(
  handler: middy.MiddyfiedHandler<any, APIGatewayProxyResult, Error, TContext>,
  { envVarsPromise, validatorOptions }: PrimaryMaterials
) {
  return primaryWrapper(handler, { envVarsPromise, validatorOptions }).use(
    handleExceptionMiddleware(EHandlerType.API_GATEWAY_PROXY)
  )
}
