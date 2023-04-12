import { getSeriesEvents } from '@/lib/motorsportstats/motorsportstats'
import { SessionResponse } from '@/lib/motorsportstats/types'
import { Series } from '@/series/config'
import Event from '@/types/event'
import { Type } from '@/types/session'
import partition from '@/utils/partition'

const SESSION_TYPE_MAP = {
  P1: Type.Practice,
  P2: Type.Practice,
  P3: Type.Practice,
  Q: Type.Qualifying,
  Race: Type.Race
}

const groupQualifying = (sessions: SessionResponse[]): SessionResponse[] => {
  const [{ 0: firstQualifying, length, [length - 1]: lastQualifying }, otherSessions] = partition(sessions, session => session.shortCode.startsWith('Q'))

  return otherSessions.concat({ uuid: 'q', name: 'Qualifying', shortCode: 'Q', startTimeUtc: firstQualifying.startTimeUtc, endTimeUtc: lastQualifying.endTimeUtc })
}

export default async (): Promise<Event[]> => getSeriesEvents(Series.FE, groupQualifying, SESSION_TYPE_MAP)