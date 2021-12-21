import { handlerResolver } from '@helpers/handler-resolver.ts'

export default {
  name: 'trafem-post-confirmation-${self:provider.stage}',
  handler: `${handlerResolver(__dirname)}/handler.execute`,
  environment: {
    SECRET_ARN: '',
    RESOURCE_ARN: '',
    REGION: '',
  },
}
