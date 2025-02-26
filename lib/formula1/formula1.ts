import { Series } from '@/series/config'
import Event from '@/types/event'
import { Type } from '@/types/session'
import axios from 'axios'
import { RacesResponse } from './types'

type SupportedSeries = Series.F1 | F1FeederSeries

type F1FeederSeries = Series.F2 | Series.F3 | Series.F1Academy

const SERIES_MAP: { [key in SupportedSeries]: string } = {
  [Series.F1]: process.env.F1_KEY,
  [Series.F2]: process.env.F2_KEY,
  [Series.F3]: process.env.F3_KEY,
  [Series.F1Academy]: process.env.F1_ACADEMY_KEY
}

export const createClient = (series: SupportedSeries) => axios.create({
  baseURL: 'https://api.formula1.com/v1',
  headers: { apikey: SERIES_MAP[series], Locale: 'en', Origin: 'https://www.formula1.com', Referer: 'https://www.formula1.com' }
})

const sessionMap = {
  PRACTICE: Type.Practice,
  QUALIFYING: Type.Qualifying,
  RESULT: Type.Race
}

export const getSeriesEvents = async (series: F1FeederSeries): Promise<Event[]> => {
  const { data } = await createClient(series).get<RacesResponse>('/f2f3-fom-results/races')

  return data.Races.map(race => ({
    id: race.RaceId,
    name: race.CountryName,
    sessions: race.Sessions.map(session => ({
      id: session.SessionId,
      name: session.SessionName,
      type: sessionMap[session.SessionCode],
      unconfirmed: session.Unconfirmed,
      startTime: session.SessionStartTime,
      endTime: session.SessionEndTime
    })),
    provisional: race.Provisional,
    series,
    raceDate: race.RaceEndDate
  }))
}