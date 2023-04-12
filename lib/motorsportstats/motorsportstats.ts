import { MotorsportStatsSeries, Series } from '@/series/config'
import Event from '@/types/event'
import Session from '@/types/session'
import axios from 'axios'
import dayjs from 'dayjs'
import { CalendarResponse, Season, SeasonsResponse, SessionMap, SessionResponse } from './types'

const CLIENT = axios.create({
  baseURL: 'https://api.motorsportstats.com/widgets/1.0.0',
  headers: { origin: 'https://widgets.motorsportstats.com', 'x-parent-referer': 'https://motorsportstats.com/' }
})

const SERIES_MAP: { [key in MotorsportStatsSeries]: string } = {
  [Series.FE]: '7415d1ab-c31d-49dd-9143-1e7e33bff889',
  [Series.BTCC]: 'ee00e922-a28b-4a8e-ae84-597af14ed931'
}

const getCurrentSeason = async (series: MotorsportStatsSeries): Promise<Season> => {
  const { data } = await CLIENT.get<SeasonsResponse>(`/series/${SERIES_MAP[series]}/seasons`)

  return data.find(season => season.status === 'Current')
}

const isoFromUnix = (unix: number) => dayjs.unix(unix).toISOString()

export const getSeriesEvents = async (series: MotorsportStatsSeries, processSessions: (sessions: SessionResponse[]) => SessionResponse[], sessionMap: SessionMap): Promise<Event[]> => {
  const season = await getCurrentSeason(series)
  const { data } = await CLIENT.get<CalendarResponse>(`/seasons/${season.uuid}/calendar`)

  return data.events
    .filter(event => !event.status)
    .map(event => {
      const hasSessions = event.sessions.length > 0
      return {
        id: event.uuid,
        name: event.name.replace('/', ' '),
        sessions: hasSessions ? getSessions(processSessions(event.sessions), sessionMap) : [],
        provisional: !hasSessions,
        series,
        raceDate: isoFromUnix(event.endTimeUtc)
      }
    })
}

const getSessions = (sessions: SessionResponse[], sessionMap: SessionMap): Session[] => {
  return sessions
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