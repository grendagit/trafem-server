import * as eventManagementDAL from './event-management.dal'
import type { TContext } from 'src/types/context.type'
import type { TGroupedEventsTransformed } from './event-management.types'

import type { Connection } from 'typeorm'
import { transformQueryStringParametersValue } from './event.management.helpers'

export async function getEvents(connection: Connection, ctx: TContext) {
  return eventManagementDAL.getEvents(connection, ctx)
}

export async function getOrderedEvents(
  orderBy: string,
  connection: Connection,
  ctx: TContext
) {
  const transformedOrderBy = transformQueryStringParametersValue(orderBy)
  return eventManagementDAL.getOrderedEvents(
    transformedOrderBy,
    connection,
    ctx
  )
}

export async function getGroupedEvents(
  groupBy: string,
  connection: Connection,
  ctx: TContext
) {
  const transformedGroupBy = transformQueryStringParametersValue(groupBy)
  const DALreturn = await eventManagementDAL.getGroupedEvents(
    transformedGroupBy,
    connection,
    ctx
  )
  const groupedEvents = DALreturn.reduce((response, { type, events }) => {
    return { ...response, [type]: JSON.parse(events) }
  }, {} as TGroupedEventsTransformed)

  return groupedEvents
}
