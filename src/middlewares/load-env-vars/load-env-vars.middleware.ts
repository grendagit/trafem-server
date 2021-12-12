import middy from '@middy/core'

import { getEnvVars } from '@helpers/load-env-vars'
import type { TContext } from 'src/types/context.type'

export function loadEnvVarsMiddleware(
  envVars: Promise<void>
): middy.MiddlewareObj<any, any, Error, TContext> {
  return {
    before: async handler => {
      await envVars
      handler.context.envVars = getEnvVars()
    },
  }
}
