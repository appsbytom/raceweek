import { Series, SeriesMap } from '@/series/config'
import Event from '@/types/event'
import btcc from './fetchers/btcc'
import extremeE from './fetchers/extreme-e'
import f1 from './fetchers/f1/f1'
import f2 from './fetchers/f2f3/f2'
import f3 from './fetchers/f2f3/f3'
import fe from './fetchers/fe'
import wseries from './fetchers/wseries'

const SERIES_FETCHER_CONFIG: SeriesMap<() => Promise<Event[]>> = {
  [Series.F1]: f1,
  [Series.F2]: f2,
  [Series.F3]: f3,
  [Series.FE]: fe,
  [Series.WSeries]: wseries,
  [Series.BTCC]: btcc,
  [Series.ExtremeE]: extremeE
}

export const getAllEvents = async (): Promise<Event[]> => {
  return (await Promise.all(Object.values(SERIES_FETCHER_CONFIG).map(value => value()))).flat()
}