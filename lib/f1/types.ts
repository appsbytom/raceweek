export type RacesResponse = {
  raceresults: RaceResponse[]
}

type RaceResponse = {
  type: Type
  meetingName: string
  meetingKey: string
  meetingStartDate: string
}

export enum Type {
  RACE = 'race',
  TESTING = 'fom-testing'
}

export type SessionsResponse = {
  timetables: SessionResponse[]
}

type SessionResponse = {
  state: string
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
}

export type Session = {
  state: string
  description: string
  startTime: string
}