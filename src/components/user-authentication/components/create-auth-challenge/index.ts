import { handlerResolver } from '@helpers/handler-resolver.ts'

export default {
  name: 'trafem-create-auth-challenge-${self:provider.stage}',
  handler: `${handlerResolver(__dirname)}/handler.execute`,
  environment: {
    SES_FROM_EMAIL: 'noreply.trafem@gmail.com',
  },
}
