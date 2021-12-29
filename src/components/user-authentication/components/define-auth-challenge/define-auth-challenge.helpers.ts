import type { DefineAuthChallengeTriggerEvent } from 'aws-lambda'

import type { TContext } from 'src/types/context.type'

export function defineNext(
  event: DefineAuthChallengeTriggerEvent,
  ctx: TContext
) {
  const {
    logger,
    envVars: { CHALLENGE_NAME, ALLOWED_ATTEMPTS },
  } = ctx

  logger.info({
    message: 'Started defining next',
    data: {
      event,
    },
  })
  const session = event.request.session

  const previousChallengeResult = session.slice(-1)[0]?.challengeResult || false
  const exceededAttempts = session.length >= Number(ALLOWED_ATTEMPTS)

  if (exceededAttempts && !previousChallengeResult) {
    /**
     * fails auth if too many times the wrong answer
     */
    event.response.issueTokens = false
    event.response.failAuthentication = true
    throw new Error('Exceeded attempts')
  } else if (previousChallengeResult) {
    /**
     * succeeds auth if the correct answer
     */
    event.response.issueTokens = true
    event.response.failAuthentication = false
  } else {
    /**
     * present challenge if no presence of the correct answer yet
     */
    event.response.issueTokens = false
    event.response.failAuthentication = false
    event.response.challengeName = CHALLENGE_NAME
  }
}

export function verifyUserExistence(event: DefineAuthChallengeTriggerEvent) {
  if (event.request.userNotFound) {
    event.response.issueTokens = false
    event.response.failAuthentication = true
    throw new Error('User does not exist')
  }
}
