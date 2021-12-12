import { handlerResolver } from '@helpers/handler-resolver.ts'

export default {
  name: 'trafem-verify-auth-challenge-response-${self:provider.stage}',
  handler: `${handlerResolver(__dirname)}/handler.execute`,
  environment: {},
}
