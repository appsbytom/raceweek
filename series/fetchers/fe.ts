import { getSeriesEvents } from '@/lib/motorsportstats/motorsportstats'
import { GetSessionType, ProcessSessions } from '@/lib/motorsportstats/types'
import { Series } from '@/series/config'
import Event from '@/types/event'
import { Type } from '@/types/session'
import partition from '@/utils/partition'

const getSessionType: GetSessionType = (sessionCode) => {
  if (/^P\d*$/.test(sessionCode)) return Type.Practice
  if (sessionCode === 'Q') return Type.Qualifying
  if (sessionCode === 'Race') return Type.Race
}

const groupQualifying: ProcessSessions = (sessions) => {
  const [{ 0: firstQualifying, length, [length - 1]: lastQualifying }, otherSessions] = partition(sessions, session => session.shortCode.startsWith('Q'))

  return otherSessions.concat({
    uuid: `${firstQualifying.uuid}-${lastQualifying.uuid}`,
    name: 'Qualifying',
    shortCode: 'Q',
    startTimeUtc: firstQualifying.startTimeUtc,
    endTimeUtc: lastQualifying.endTimeUtc
  })
}

export default async (): Promise<Event[]> => getSeriesEvents(Series.FE, getSessionType, groupQualifying)