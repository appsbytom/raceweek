export type Event = {
  id: number | string
  name: string
  sessions: Session[]
  provisional: boolean
  series: Series
}

export enum Series {
  F1 = 'f1',
  F2 = 'f2',
  F3 = 'f3',
  FE = 'fe',
  WSeries = 'wseries'
}

export type Session = {
  id: number | string
  name: string
  type: Type
  unconfirmed: boolean
  startTime: string
  endTime: string
}

export enum Type {
  Practice = 'p',
  Qualifying = 'q',
  Race = 'r'
}

export type FollowedSessions = string[]