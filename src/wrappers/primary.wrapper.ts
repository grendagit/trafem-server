import middy from '@middy/core'
import validator from '@middy/validator'

import { loadEnvVarsMiddleware } from '@middlewares/load-env-vars'
import { loadLoggerMiddleware } from '@middlewares/load-logger'
import type { TContext } from 'src/types/context.type'
import type { TPrimaryMaterials } from 'src/types/wrapper-primary-materials.type'

export function primaryWrapper(
  handler: middy.MiddyfiedHandler<any, any, Error, TContext>,
  { envVarsPromise, validatorOptions }: TPrimaryMaterials
) {
  return handler
    .use(loadLoggerMiddleware())
    .use(loadEnvVarsMiddleware(envVarsPromise))
    .use(validator(validatorOptions))
}
