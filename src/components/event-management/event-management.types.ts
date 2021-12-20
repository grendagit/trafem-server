import { Event, EEventType } from '../../entities'

export type TGroupedEvent = {
  type: EEventType
  events: string
}
export type TGetEventsReturnDAL = {
  groupedEvents: TGroupedEvent[]
  latestEvents: Event[]
}
export type TGroupedEventsTransformed = { [key in EEventType]?: Event[] }
export type TGetEventsReturn = Omit<TGetEventsReturnDAL, 'groupedEvents'> & {
  groupedEvents: TGroupedEventsTransformed
}
