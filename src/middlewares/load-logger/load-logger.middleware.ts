import middy from '@middy/core'

import type { TContext } from 'src/types/context.type'

import * as winston from 'winston'

export const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.json(),
      silent: process.argv.indexOf('--silent') !== -1,
    }),
  ],
})

export function loadLoggerMiddleware(): middy.MiddlewareObj<
  any,
  any,
  Error,
  TContext
> {
  return {
    before: handler => {
      handler.context.logger = logger
    },
  }
}
