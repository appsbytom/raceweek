import { Type } from '@/types/session'

export type CalendarResponse = {
  events: EventResponse[]
}

export type EventResponse = {
  uuid: string
  name: string
  status: string
  sessions: SessionResponse[]
  endTimeUtc: number
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

export type GetSessionType = (sessionCode: string) => Type | undefined

export type ProcessSessions = (sessions: SessionResponse[]) => SessionResponse[]