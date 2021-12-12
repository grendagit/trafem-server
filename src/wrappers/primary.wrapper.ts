import middy from '@middy/core'
import validator from '@middy/validator'

import { loadEnvVarsMiddleware } from '@middlewares/load-env-vars'
import { loadLoggerMiddleware } from '@middlewares/load-logger'
import type { TContext } from 'src/types/context.type'

type PrimaryMaterials = {
  envVarsPromise: Promise<void>
  validatorOptions: Parameters<typeof validator>[0]
}

export function primaryWrapper(
  handler: middy.MiddyfiedHandler<any, any, Error, TContext>,
  { envVarsPromise, validatorOptions }: PrimaryMaterials
) {
  return handler
    .use(loadLoggerMiddleware())
    .use(loadEnvVarsMiddleware(envVarsPromise))
    .use(validator(validatorOptions))
}
