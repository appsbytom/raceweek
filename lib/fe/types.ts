export type CalendarResponse = {
  events: EventResponse[]
}

export type EventResponse = {
  uuid: string
  name: string
  status: string
  sessions: SessionResponse[]
}

export type SessionResponse = {
  uuid: string
  name: string
  shortCode: string
  startTimeUtc: number
  endTimeUtc: number
}

export type SeasonsResponse = Season[]

export type Season = {
  uuid: string
  status: string
}