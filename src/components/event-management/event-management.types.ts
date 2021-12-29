import { Event, EEventType } from '../../entities'

export type TGroupedEvent = {
  type: EEventType
  events: string
}
export type TGroupedEventsTransformed = { [key in EEventType]?: Event[] }
