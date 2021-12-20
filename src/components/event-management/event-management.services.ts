import * as eventManagementDAL from './event-management.dal'
import type { TContext } from 'src/types/context.type'
import type {
  TGetEventsReturn,
  TGroupedEventsTransformed,
} from './event-management.types'

import type { Connection } from 'typeorm'

export async function getEvents(
  connection: Connection,
  ctx: TContext
): Promise<TGetEventsReturn> {
  const DALreturn = await eventManagementDAL.getEvents(connection, ctx)
  const groupedEvents = DALreturn.groupedEvents.reduce(
    (response, { type, events }) => {
      return { ...response, [type]: JSON.parse(events) }
    },
    {} as TGroupedEventsTransformed
  )

  return {
    groupedEvents,
    latestEvents: DALreturn.latestEvents,
  }
}
