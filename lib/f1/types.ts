import { RaceStatus } from '@/types/race'

export type EventsResponse = {
  events: EventResponse[]
}

type EventResponse = {
  type: string
  meetingName: string
  meetingKey: string
  status: RaceStatus
}

export type SessionsResponse = {
  timetables: SessionResponse[]
}

type SessionResponse = {
  session: string
  description: string
  startTime: string
  gmtOffset: string
}