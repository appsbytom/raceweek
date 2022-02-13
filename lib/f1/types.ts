export type EventsResponse = {
  events: EventResponse[]
}

type EventResponse = {
  type: string
  meetingName: string
  meetingKey: string
  meetingEndDate: string
  gmtOffset: string
}

export type SessionsResponse = {
  timetables: SessionResponse[]
}

type SessionResponse = {
  session: string
  description: string
  startTime: string
  endTime: string
  gmtOffset: string
}