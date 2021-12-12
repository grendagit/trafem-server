import { handlerResolver } from '@helpers/handler-resolver.ts'

export default {
  name: 'trafem-define-auth-challenge-${self:provider.stage}',
  handler: `${handlerResolver(__dirname)}/handler.execute`,
  environment: {
    CHALLENGE_NAME: 'CUSTOM_CHALLENGE',
    ALLOWED_ATTEMPTS: '3',
  },
}
