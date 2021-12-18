import type { APIGatewayProxyResult } from 'aws-lambda'
import middy from '@middy/core'

import { primaryWrapper } from './primary.wrapper'
import {
  handleExceptionMiddleware,
  EHandlerType,
} from '@middlewares/handle-exception'
import type { TContext } from 'src/types/context.type'
import type { TPrimaryMaterials } from 'src/types/wrapper-primary-materials.type'

export function APIGatewayProxyHandlerWrapper(
  handler: middy.MiddyfiedHandler<any, APIGatewayProxyResult, Error, TContext>,
  { envVarsPromise, validatorOptions }: TPrimaryMaterials
) {
  return primaryWrapper(handler, { envVarsPromise, validatorOptions }).use(
    handleExceptionMiddleware(EHandlerType.API_GATEWAY_PROXY)
  )
}
