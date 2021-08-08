export type Race = {
  id: number | string
  name: string
  sessions: Session[]
  provisional: boolean
  series: Series
}

export enum Series {
  F1= 'f1',
  F2= 'f2',
  F3= 'f3',
  FE= 'fe',
  WSeries= 'wseries'
}

export type Session = {
  id: number | string
  name: string
  unconfirmed: boolean
  startTime: string
  endTime: string
}