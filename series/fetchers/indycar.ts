import { getSeriesEvents } from '@/lib/motorsportstats/motorsportstats'
import { GetSessionType, ProcessSessions } from '@/lib/motorsportstats/types'
import { Type } from '@/types/session'
import partition from '@/utils/partition'
import { Series } from '../config'

const getSessionType: GetSessionType = (sessionCode) => {
  if (/^P\d*$/.test(sessionCode) || sessionCode === 'FPR' || sessionCode === 'WU') {
    return Type.Practice
  }
  if (sessionCode === 'Q') return Type.Qualifying
  if (sessionCode === 'Race') return Type.Race
}

const groupQualifying: ProcessSessions = (sessions) => {
  const [{ 0: firstQualifying, length, [length - 1]: lastQualifying }, otherSessions] = partition(sessions, session => /^Q\d*$/.test(session.shortCode))

  return otherSessions.concat({ uuid: 'q', name: 'Qualifying', shortCode: 'Q', startTimeUtc: firstQualifying.startTimeUtc, endTimeUtc: lastQualifying.endTimeUtc })
}

export default () => getSeriesEvents(Series.IndyCar, getSessionType, groupQualifying)