export type Race = {
  id: number | string
  name: string
  sessions: Session[]
  provisional: boolean
  status: RaceStatus
}

export enum RaceStatus {
  UPCOMING = 'upcoming',
  COMPLETED = 'completed',
  ONGOING = 'ongoing'
}

export type Session = {
  id: number | string
  name: string
  unconfirmed: boolean
  startTime: string
}