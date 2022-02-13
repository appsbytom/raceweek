import Event, { Series } from './event'
import Session from './session'

type Week = {
  number: number
  days: Day[]
}

type Day = {
  date: string
  sessions: GroupedSession[]
  provisionalEvents: Event[]
}

export type GroupedSession = Session & {
  series: Series
  eventName: string
}

export default Week