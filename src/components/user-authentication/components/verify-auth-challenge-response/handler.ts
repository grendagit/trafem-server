import type { VerifyAuthChallengeResponseTriggerHandler } from 'aws-lambda'
import middy from '@middy/core'

import { verifyChallengeAnswer } from './verify-auth-challenge-response.helpers'
import { loadEnvVars } from '@helpers/load-env-vars'
import { primaryWrapper } from '@wrappers/primary.wrapper'
import type { TContext } from 'src/types/context.type'

const envVarsPromise = loadEnvVars({})

const handler: VerifyAuthChallengeResponseTriggerHandler = async (
  event,
  ctx: TContext
) => {
  return verifyChallengeAnswer(event, ctx)
}

export const execute = primaryWrapper(middy(handler), {
  envVarsPromise,
  validatorOptions: { inputSchema: {} },
})
