import Event, { Series } from '@/types/event'
import Session, { Type } from '@/types/session'
import axios from 'axios'
import dayjs from 'dayjs'
import { CalendarResponse, EventResponse, Season, SeasonsResponse, SessionResponse } from './types'

const client = axios.create({
  baseURL: 'https://api.motorsportstats.com/widgets/1.0.0',
  headers: { origin: 'https://widgets.motorsportstats.com', 'x-parent-referer': 'https://motorsportstats.com/' }
})

const getCurrentSeason = async (): Promise<Season> => {
  const { data } = await client.get<SeasonsResponse>('/series/7415d1ab-c31d-49dd-9143-1e7e33bff889/seasons')

  return data.find(season => season.status === 'Current')
}

export const getEvents = async (): Promise<Event[]> => {
  const season = await getCurrentSeason()
  const { data } = await client.get<CalendarResponse>(`/seasons/${season.uuid}/calendar`)

  const events: EventResponse[] = []
  for (const event of data.events.filter(event => !event.status)) {
    if (event.sessions.filter(session => session.shortCode === 'Race').length > 1) {
      const firstRaceIndex = event.sessions.findIndex(session => session.shortCode === 'Race') + 1
      events.push(
        { ...event, sessions: event.sessions.slice(0, firstRaceIndex) },
        { ...event, uuid: `${event.uuid}-2`, name: `${event.name} 2`, sessions: event.sessions.slice(firstRaceIndex) })
    } else {
      events.push(event)
    }
  }

  return events.map(event => {
    const hasSessions = event.sessions.length > 0
    return {
      id: event.uuid,
      name: event.name,
      sessions: hasSessions ? getSessions(event.sessions) : [],
      provisional: !hasSessions,
      series: Series.FE
    }
  })
}

const sessionMap = {
  P1: Type.Practice,
  P2: Type.Practice,
  P3: Type.Practice,
  Q: Type.Qualifying,
  Race: Type.Race
}

const isoFromUnix = unix => dayjs.unix(unix).toISOString()

const getSessions = (sessions: SessionResponse[]): Session[] => {
  const { 0: firstQualifying, length, [length - 1]: lastQualifying } = sessions.filter(session => session.shortCode.startsWith('Q'))

  return sessions
    .filter(session => !session.shortCode.startsWith('Q'))
    .concat({ uuid: 'q', name: 'Qualifying', shortCode: 'Q', startTimeUtc: firstQualifying.startTimeUtc, endTimeUtc: lastQualifying.endTimeUtc })
    .map(session => ({
      id: session.uuid,
      name: session.name,
      type: sessionMap[session.shortCode],
      unconfirmed: false,
      startTime: isoFromUnix(session.startTimeUtc),
      endTime: isoFromUnix(session.endTimeUtc)
    }))
}