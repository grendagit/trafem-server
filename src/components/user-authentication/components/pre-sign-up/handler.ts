import type { PreSignUpTriggerHandler } from 'aws-lambda'
import middy from '@middy/core'

import { loadEnvVars } from '@helpers/load-env-vars'
import { primaryWrapper } from '@wrappers/primary.wrapper'

const envVarsPromise = loadEnvVars({})

const handler: PreSignUpTriggerHandler = async event => {
  event.response.autoConfirmUser = true
  event.response.autoVerifyEmail = true
  return event
}

export const execute = primaryWrapper(middy(handler), {
  envVarsPromise,
  validatorOptions: { inputSchema: {} },
})
