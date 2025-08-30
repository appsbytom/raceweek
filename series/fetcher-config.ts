import { getSeriesEvents } from '@/lib/formula1/formula1'
import { getEvents } from './fetchers/db'
import { Series, SeriesMap } from '@/series/config'
import Event from '@/types/event'
import partition from '@/utils/partition'
import extremeE from './fetchers/extreme-e'
import f1 from './fetchers/f1/f1'
import fe from './fetchers/fe'

const SERIES_FETCHER_CONFIG: SeriesMap<() => Promise<Event[]>> = {
  [Series.F1]: f1,
  [Series.F2]: () => getSeriesEvents(Series.F2),
  [Series.F3]: () => getSeriesEvents(Series.F3),
  [Series.FE]: fe,
  [Series.BTCC]: () => getEvents(Series.BTCC),
  [Series.ExtremeE]: extremeE,
  [Series.IndyCar]: () => getEvents(Series.IndyCar),
  [Series.F1Academy]: () => getSeriesEvents(Series.F1Academy),
  [Series.WRX]: () => getEvents(Series.WRX),
}

export const getAllEvents = async (): Promise<Event[][]> => {
  const events = (await Promise.all(Object.values(SERIES_FETCHER_CONFIG).map(value => value()))).flat()
  return partition(events, event => event.provisional || event.sessions.some(session => !session.endTime))
}