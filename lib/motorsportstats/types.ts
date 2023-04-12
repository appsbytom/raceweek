import { Type } from '@/types/session'

export type CalendarResponse = {
  events: EventResponse[]
}

type EventResponse = {
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

export type SessionMap = { [key: string]: Type }