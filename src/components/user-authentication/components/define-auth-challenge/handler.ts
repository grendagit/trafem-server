import type { DefineAuthChallengeTriggerHandler } from 'aws-lambda'
import middy from '@middy/core'

import {
  defineNext,
  verifyUserExistence,
} from './define-auth-challenge.helpers'
import { loadEnvVars } from '@helpers/load-env-vars'
import { primaryWrapper } from '@wrappers/primary.wrapper'
import type { TContext } from 'src/types/context.type'

const envVarsPromise = loadEnvVars({
  CHALLENGE_NAME: null,
  ALLOWED_ATTEMPTS: null,
})

const handler: DefineAuthChallengeTriggerHandler = async (
  event,
  ctx: TContext
) => {
  /**
   * throws an error if no existence of the user
   */
  verifyUserExistence(event)

  defineNext(event, ctx)
  return event
}

export const execute = primaryWrapper(middy(handler), {
  envVarsPromise,
  validatorOptions: { inputSchema: {} },
})
