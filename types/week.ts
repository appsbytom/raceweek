import { Series } from '@/series/config'
import Event from './event'
import Session, { Type } from './session'

type Week = {
  date: string
  weekNumber: number
  days: Day[]
}

type Day = {
  date: string
  sessions: GroupedSession[]
  provisionalEvents: Event[]
}

export type GroupedSession = Session & {
  series: Series
  type: Type
  eventName: string
}

export default Week