import type {
  ChallengeResult,
  CustomChallengeResult,
} from 'aws-lambda/trigger/cognito-user-pool-trigger/_common'
import { randomInt } from 'crypto'

export function generateSecretLoginCode(digits: number) {
  return [...Array(digits)].map(() => randomInt(0, 10)).join('')
}

export function getSecretLoginCodeFromSession(
  session: (ChallengeResult | CustomChallengeResult)[]
) {
  const previousChallenge = session.slice(-1)[0]
  return previousChallenge.challengeMetadata!.match(/CODE-(\d*)/)![1]
}
