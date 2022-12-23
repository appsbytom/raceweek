import { Series } from '@/series/config'
import Event from '@/types/event'
import Session, { Type } from '@/types/session'
import partition from '@/utils/partition'
import axios from 'axios'
import dayjs from 'dayjs'
import { CalendarResponse, Season, SeasonsResponse, SessionResponse } from './types'

const client = axios.create({
  baseURL: 'https://api.motorsportstats.com/widgets/1.0.0',
  headers: { origin: 'https://widgets.motorsportstats.com', 'x-parent-referer': 'https://motorsportstats.com/' }
})

const getCurrentSeason = async (): Promise<Season> => {
  const { data } = await client.get<SeasonsResponse>('/series/7415d1ab-c31d-49dd-9143-1e7e33bff889/seasons')

  return data.find(season => season.status === 'Current')
}

const isoFromUnix = (unix: number) => dayjs.unix(unix).toISOString()

const getEvents = async (): Promise<Event[]> => {
  const season = await getCurrentSeason()
  const { data } = await client.get<CalendarResponse>(`/seasons/${season.uuid}/calendar`)

  return data.events
    .filter(event => !event.status)
    .map(event => {
      const hasSessions = event.sessions.length > 0
      return {
        id: event.uuid,
        name: event.name.replace('/', ' '),
        sessions: hasSessions ? getSessions(event.sessions) : [],
        provisional: !hasSessions,
        series: Series.FE,
        raceDate: isoFromUnix(event.endTimeUtc)
      }
    })
}

export default getEvents

const sessionMap = {
  P1: Type.Practice,
  P2: Type.Practice,
  P3: Type.Practice,
  Q: Type.Qualifying,
  Race: Type.Race
}

const getSessions = (sessions: SessionResponse[]): Session[] => {
  const [{ 0: firstQualifying, length, [length - 1]: lastQualifying }, otherSessions] = partition(sessions, session => session.shortCode.startsWith('Q'))

  return otherSessions
    .concat({ uuid: 'q', name: 'Qualifying', shortCode: 'Q', startTimeUtc: firstQualifying.startTimeUtc, endTimeUtc: lastQualifying.endTimeUtc })
    .sort((a, b) => a.startTimeUtc - b.startTimeUtc)
    .map(session => ({
      id: session.uuid,
      name: session.name,
      type: sessionMap[session.shortCode],
      unconfirmed: false,
      startTime: isoFromUnix(session.startTimeUtc),
      endTime: isoFromUnix(session.endTimeUtc)
    }))
}