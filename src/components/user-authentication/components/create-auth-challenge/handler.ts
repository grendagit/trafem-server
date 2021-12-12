import type { CreateAuthChallengeTriggerHandler } from 'aws-lambda'
import middy from '@middy/core'

import { sendEmailWithSecretLoginCode } from './create-auth-challenge.controllers'
import {
  generateSecretLoginCode,
  getSecretLoginCodeFromSession,
} from './create-auth-challenge.helpers'
import { primaryWrapper } from '@wrappers/primary.wrapper'
import { loadEnvVars } from '@helpers/load-env-vars'
import type { TContext } from 'src/types/context.type'

const envVarsPromise = loadEnvVars({
  SES_FROM_EMAIL: '',
})

const handler: CreateAuthChallengeTriggerHandler = async (
  event,
  ctx: TContext
) => {
  const session = event.request.session

  let secretLoginCode: string
  if (!session.length) {
    /**
     * generates a new secret login code and mail it to the user if a new auth session
     */
    secretLoginCode = generateSecretLoginCode(6)
    const toEmail = event.request.userAttributes.email
    if (toEmail) {
      await sendEmailWithSecretLoginCode(toEmail, secretLoginCode, ctx)
    }
  } else {
    /**
     * doesn't generate new digits but re-use the code from the current session
     * allows the user to make a mistake when keying in the code and to then retry, rather the needing to email the user an all new code again
     */
    secretLoginCode = getSecretLoginCodeFromSession(session)
  }

  /**
   * is sent back to the client app
   */
  event.response.publicChallengeParameters = {
    email: event.request.userAttributes.email,
  }

  /**
   * adds the secret login code to the private challenge parameters so it can be verified by the "Verify Auth Challenge Response" trigger
   */
  event.response.privateChallengeParameters = { secretLoginCode }

  /**
   * adds the secret login code to the session so it is available in a next invocation of the "Create Auth Challenge" trigger
   */
  event.response.challengeMetadata = `CODE-${secretLoginCode}`

  return event
}

export const execute = primaryWrapper(middy(handler), {
  envVarsPromise,
  validatorOptions: { inputSchema: {} },
})
