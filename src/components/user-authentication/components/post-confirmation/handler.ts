import type { PostConfirmationTriggerHandler } from 'aws-lambda'
import middy from '@middy/core'

import { loadEnvVars } from '@helpers/load-env-vars'
import { getConnection } from '@helpers/get-connection'
import { primaryWrapper } from '@wrappers/primary.wrapper'
import { setUpEndUser } from './post-confirmation.controllers'
import type { TContext } from 'src/types/context.type'

const envVarsPromise = loadEnvVars({
  SECRET_ARN: '',
  RESOURCE_ARN: '',
  REGION: '',
})

const handler: PostConfirmationTriggerHandler = async (
  event,
  ctx: TContext
) => {
  const connection = await getConnection(ctx)

  await setUpEndUser(event, connection, ctx)
  return event
}

export const execute = primaryWrapper(middy(handler), {
  envVarsPromise,
  validatorOptions: { inputSchema: {} },
})
