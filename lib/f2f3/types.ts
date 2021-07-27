export type RacesResponse = {
  Races: RaceResponse[]
}

type RaceResponse = {
  RaceId: number
  CountryName: string
  CircuitShortName: string
  Sessions: SessionResponse[]
  State: RaceState
}

enum RaceState {
  PRE_RACE = 'PRE-RACE',
  POST_RACE = 'POST-RACE'
}

type SessionResponse = {
  SessionId: number
  SessionCode: SessionCode
  SessionName: string
  Unconfirmed: boolean
  SessionStartTime: string
}

export enum SessionCode {
  PRACTICE = 'PRACTICE',
  QUALIFYING = 'QUALIFYING',
  RACE = 'RESULT'
}

export type Race = {
  id: number
  name: string
  sessions: Session[]
  state: RaceState
}

type Session = {
  id: number
  name: string
  unconfirmed: boolean
  startTime: string
}