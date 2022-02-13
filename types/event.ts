import Session from './session'

type Event = {
  id: number | string
  name: string
  sessions: Session[]
  provisional: boolean
  series: Series
  raceDate: string
}

export enum Series {
  F1 = 'f1',
  F2 = 'f2',
  F3 = 'f3',
  FE = 'fe',
  WSeries = 'wseries'
}

export default Event