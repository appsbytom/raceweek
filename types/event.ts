import { Series } from '@/series/config'
import Session from './session'

type Event = {
  id: number | string
  name: string
  sessions: Session[]
  provisional: boolean
  series: Series
  raceDate: string
}

export default Event