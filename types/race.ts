export type Race = {
  id: number | string
  name: string
  sessions: Session[]
  provisional: boolean
}

export type Session = {
  id: number | string
  name: string
  unconfirmed: boolean
  startTime: string
  endTime: string
}