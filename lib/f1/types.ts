export type EventsResponse = {
  events: EventResponse[]
}

type EventResponse = {
  type: EventType
  meetingName: string
  meetingKey: string
  status: RaceStatus
}

export enum EventType {
  RACE = 'race',
  TESTING = 'fom-testing'
}

enum RaceStatus {
  UPCOMING = 'upcoming',
  COMPLETED = 'completed'
}

export type SessionsResponse = {
  timetables: SessionResponse[]
}

type SessionResponse = {
  session: SessionType
  description: string
  startTime: string
  gmtOffset: string
}

export enum SessionType {
  PRACTICE_1 = 'p1',
  PRACTICE_2 = 'p2',
  PRACTICE_3 = 'p3',
  QUALIFYING = 'q',
  SPRINT_QUALIFYING = 's',
  RACE = 'r'
}

export type Race = {
  meetingName: string
  meetingKey: string
  sessions: Session[]
  status: RaceStatus
}

export type Session = {
  description: string
  startTime: string
}