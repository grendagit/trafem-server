import type { Context } from 'aws-lambda'

import type { Generic } from './generic.type'

import * as winston from 'winston'

export type TContext<TEnvVars = Generic> = Context & {
  logger: winston.Logger
  envVars: TEnvVars
}
