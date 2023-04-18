import { getSeriesEvents } from '@/lib/motorsportstats/motorsportstats'
import { Series } from '@/series/config'
import { Type } from '@/types/session'

const SESSION_TYPE_MAP = {
  FP1: Type.Practice,
  FP2: Type.Practice,
  QH1: Type.Qualifying,
  QH2: Type.Qualifying,
  RR: Type.Race,
  Race: Type.Race
}

export default () => getSeriesEvents(Series.ExtremeE, SESSION_TYPE_MAP, sessions => sessions, (event) => {
  const sessions = event.sessions.filter(session => session.name !== 'Race')
  if (sessions.filter(session => session.shortCode === 'Race').length > 1) {
    const firstRaceIndex = sessions.findIndex(session => session.shortCode === 'Race') + 1
    const firstEventSessions = sessions.slice(0, firstRaceIndex)
    const secondEventSessions = sessions.slice(firstRaceIndex)
    return [
      { ...event, sessions: firstEventSessions, endTimeUtc: firstEventSessions.at(-1).endTimeUtc },
      { ...event, uuid: `${event.uuid}-2`, name: `${event.name} 2`, sessions: secondEventSessions, endTimeUtc: secondEventSessions.at(-1).endTimeUtc }]
  } else {
    return { ...event, sessions }
  }
})