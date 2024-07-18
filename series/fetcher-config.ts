import { Series, SeriesMap } from '@/series/config'
import Event from '@/types/event'
import partition from '@/utils/partition'
import btcc from './fetchers/btcc'
import extremeE from './fetchers/extreme-e'
import f1Academy from './fetchers/f1-academy'
import f1 from './fetchers/f1/f1'
import f2 from './fetchers/f2'
import f3 from './fetchers/f3'
import fe from './fetchers/fe'
import indycar from './fetchers/indycar'

const SERIES_FETCHER_CONFIG: SeriesMap<() => Promise<Event[]>> = {
  [Series.F1]: f1,
  [Series.F2]: f2,
  [Series.F3]: f3,
  [Series.FE]: fe,
  [Series.BTCC]: btcc,
  [Series.ExtremeE]: extremeE,
  [Series.IndyCar]: indycar,
  [Series.F1Academy]: f1Academy
}

export const getAllEvents = async (): Promise<Event[][]> => {
  const events = (await Promise.all(Object.values(SERIES_FETCHER_CONFIG).map(value => value()))).flat()
  return partition(events, event => event.provisional || event.sessions.some(session => !session.endTime))
}