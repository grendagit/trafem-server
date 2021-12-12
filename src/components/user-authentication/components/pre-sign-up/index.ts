import { handlerResolver } from '@helpers/handler-resolver.ts'

export default {
  name: 'trafem-pre-sign-up-${self:provider.stage}',
  handler: `${handlerResolver(__dirname)}/handler.execute`,
  environment: {},
}
