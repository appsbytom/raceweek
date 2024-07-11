import { getSeriesEvents } from '@/lib/motorsportstats/motorsportstats'
import { GetSessionType } from '@/lib/motorsportstats/types'
import { Series } from '@/series/config'
import { Type } from '@/types/session'

const getSessionType: GetSessionType = (sessionCode) => {
  if (/^FP\d*$/.test(sessionCode)) return Type.Practice
  if (/^QH\d*$/.test(sessionCode)) return Type.Qualifying
  if (sessionCode === 'Race' || sessionCode === 'RR') return Type.Race
}

export default () => getSeriesEvents(Series.ExtremeE, getSessionType, sessions => sessions, (event) => {
  const sessions = event.sessions.filter(session => session.name !== 'Race')
  if (sessions.filter(session => session.shortCode === 'Race').length > 1) {
    const firstRaceIndex = sessions.findIndex(session => session.shortCode === 'Race') + 1
    const firstEventSessions = sessions.slice(0, firstRaceIndex)
    const secondEventSessions = sessions.slice(firstRaceIndex)
    return [
      { ...event, sessions: firstEventSessions, endDate: firstEventSessions.at(-1).endTimeUtc },
      { ...event, uuid: `${event.uuid}-2`, name: `${event.name} 2`, sessions: secondEventSessions, endDate: secondEventSessions.at(-1).endTimeUtc }]
  } else {
    return { ...event, sessions }
  }
})