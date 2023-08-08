import { getSeriesEvents } from '@/lib/motorsportstats/motorsportstats'
import { GetSessionType } from '@/lib/motorsportstats/types'
import { Series } from '@/series/config'
import Event from '@/types/event'
import { Type } from '@/types/session'

const getSessionType: GetSessionType = (sessionCode) => {
  if (/^P\d*$/.test(sessionCode)) return Type.Practice
  if (/^Q\d*$/.test(sessionCode)) return Type.Qualifying
  if (sessionCode === 'Race') return Type.Race
}

export default async (): Promise<Event[]> => getSeriesEvents(Series.BTCC, getSessionType)