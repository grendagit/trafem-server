import { handlerResolver } from '@helpers/handler-resolver.ts'

export default {
  name: 'trafem-get-events-${self:provider.stage}',
  handler: `${handlerResolver(__dirname)}/handler.execute`,
  environment: {
    CORS_CONFIG: '',
    SECRET_ARN: '',
    RESOURCE_ARN: '',
    REGION: '',
  },
}
