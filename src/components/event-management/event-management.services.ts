import * as eventManagementDAL from './event-management.dal'
import type { TContext } from 'src/types/context.type'

import type { Connection } from 'typeorm'

export function getEvents(connection: Connection, ctx: TContext) {
  return eventManagementDAL.getEvents(connection, ctx)
}
