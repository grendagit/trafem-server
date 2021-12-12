import type { VerifyAuthChallengeResponseTriggerEvent } from 'aws-lambda'

import type { TContext } from 'src/types/context.type'

export function verifyChallengeAnswer(
  event: VerifyAuthChallengeResponseTriggerEvent,
  ctx: TContext
): VerifyAuthChallengeResponseTriggerEvent {
  const { logger } = ctx

  const expectedAnswer =
    event.request.privateChallengeParameters.secretLoginCode
  const challengeAnswer = event.request.challengeAnswer

  logger.info({
    message: 'Started veryfing challenge answer',
    data: {
      challengeAnswer,
      expectedAnswer,
    },
  })

  event.response.answerCorrect = challengeAnswer === expectedAnswer

  return event
}
