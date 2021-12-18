import { logger } from '@middlewares/load-logger'
import type { TContext } from 'src/types/context.type'

export function ensureLoggerPresence(ctx: TContext) {
  return ctx.logger || logger
}
