type Session = {
  id: number | string
  name: string
  type: Type
  unconfirmed: boolean
  startTime: string
  endTime: string
}

export enum Type {
  Practice = 'p',
  Qualifying = 'q',
  Race = 'r'
}

export type FollowedSessions = string[]

export default Session