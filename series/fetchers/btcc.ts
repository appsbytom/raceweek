import { getSeriesEvents } from '@/lib/motorsportstats/motorsportstats'
import { Series } from '@/series/config'
import Event from '@/types/event'
import { Type } from '@/types/session'

const SESSION_TYPE_MAP = {
  P1: Type.Practice,
  P2: Type.Practice,
  Q: Type.Qualifying,
  Race: Type.Race
}

export default async (): Promise<Event[]> => getSeriesEvents(Series.BTCC, sessions => sessions, SESSION_TYPE_MAP)