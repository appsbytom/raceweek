import { getSeriesEvents } from '@/lib/motorsportstats/motorsportstats'
import Event from '@/types/event'
import { Type } from '@/types/session'
import { Series } from '../config'

const getSessionType = (sessionCode: string) => {
  if (/^P\d*$/.test(sessionCode)) return Type.Practice
  else if (/^QH\d*$/.test(sessionCode)) return Type.Qualifying
  else if (/^SF \d*$/.test(sessionCode)) return Type.Race
}

export default async (): Promise<Event[]> => getSeriesEvents(Series.WRX, getSessionType)