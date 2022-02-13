export type RacesResponse = {
  Races: RaceResponse[]
}

type RaceResponse = {
  RaceId: number
  CountryName: string
  Sessions: SessionResponse[]
  Provisional: boolean
  RaceEndDate: string
}

type SessionResponse = {
  SessionId: number
  SessionCode: string
  SessionName: string
  Unconfirmed: boolean
  SessionStartTime: string
  SessionEndTime: string
}