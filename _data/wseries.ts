import { Race } from '@/types/race'

const practiceSession = {
  id: 'p',
  name: 'Practice',
  unconfirmed: false
};
const qualifyingSession = {
  id: 'q',
  name: 'Qualifying',
  unconfirmed: false
};
const raceSession = {
  id: 'r',
  name: 'Race',
  unconfirmed: false
};

const races: Race[] = [
  {
    id: 'styrian',
    name: 'Styrian',
    sessions: [
      { ...practiceSession, startTime: '2021-06-25T13:10:00+02:00', endTime: '2021-06-25T13:40:00+02:00' },
      { ...qualifyingSession, startTime: '2021-06-25T16:30:00+02:00', endTime: '2021-06-25T17:00:00+02:00' },
      { ...raceSession, startTime: '2021-06-26T16:30:00+02:00', endTime: '2021-06-26T17:05:00+02:00' }
    ],
    provisional: false
  },
  {
    id: 'austrian',
    name: 'Austrian',
    sessions: [
      { ...practiceSession, startTime: '2021-07-02T12:55:00+02:00', endTime: '2021-07-02T13:25:00+02:00' },
      { ...qualifyingSession, startTime: '2021-07-02T16:30:00+02:00', endTime: '2021-07-02T17:00:00+02:00' },
      { ...raceSession, startTime: '2021-07-03T16:30:00+02:00', endTime: '2021-07-03T17:05:00+02:00' }
    ],
    provisional: false
  },
  {
    id: 'british',
    name: 'British',
    sessions: [
      { ...practiceSession, startTime: '2021-07-16T11:00:00+01:00', endTime: '2021-07-16T11:30:00+01:00' },
      { ...qualifyingSession, startTime: '2021-07-16T16:05:00+01:00', endTime: '2021-07-16T16:35:00+01:00' },
      { ...raceSession, startTime: '2021-07-17T13:25:00+01:00', endTime: '2021-07-17T14:00:00+01:00' }
    ],
    provisional: false
  },
  {
    id: 'hungarian',
    name: 'Hungarian',
    sessions: [
      { ...practiceSession, startTime: '2021-07-30T12:55:00+02:00', endTime: '2021-07-30T13:25:00+02:00' },
      { ...qualifyingSession, startTime: '2021-07-30T16:30:00+02:00', endTime: '2021-07-30T17:00:00+02:00' },
      { ...raceSession, startTime: '2021-07-31T16:30:00+02:00', endTime: '2021-07-31T17:05:00+02:00' }
    ],
    provisional: false
  },
  {
    id: 'belgian',
    name: 'Belgian',
    sessions: [
      { ...practiceSession, startTime: '2021-08-27T12:55:00+02:00', endTime: '2021-08-27T13:25:00+02:00', unconfirmed: true },
      { ...qualifyingSession, startTime: '2021-08-27T16:30:00+02:00', endTime: '2021-08-27T17:00:00+02:00', unconfirmed: true },
      { ...raceSession, startTime: '2021-08-28T16:30:00+02:00', endTime: '2021-08-28T17:05:00+02:00', unconfirmed: true }
    ],
    provisional: false
  },
  {
    id: 'dutch',
    name: 'Dutch',
    sessions: [
      { ...practiceSession, startTime: '2021-09-03T12:55:00+02:00', endTime: '2021-09-03T13:25:00+02:00', unconfirmed: true },
      { ...qualifyingSession, startTime: '2021-09-03T16:30:00+02:00', endTime: '2021-09-03T17:00:00+02:00', unconfirmed: true },
      { ...raceSession, startTime: '2021-09-04T16:30:00+02:00', endTime: '2021-09-04T17:05:00+02:00', unconfirmed: true }
    ],
    provisional: false
  },
  {
    id: 'united-states',
    name: 'United States',
    sessions: [
      { ...practiceSession, startTime: '2021-10-22T14:00:00-05:00', endTime: '2021-10-22T14:30:00-05:00', unconfirmed: true },
      { ...qualifyingSession, startTime: '2021-10-22T17:00:00-05:00', endTime: '2021-10-22T17:30:00-05:00', unconfirmed: true },
      { ...raceSession, startTime: '2021-10-23T17:45:00-05:00', endTime: '2021-10-23T18:20:00-05:00', unconfirmed: true }
    ],
    provisional: false
  },
  {
    id: 'mexican',
    name: 'Mexican',
    sessions: [
      { ...practiceSession, startTime: '2021-10-29T12:00:00-05:00', endTime: '2021-10-29T12:30:00-05:00', unconfirmed: true },
      { ...qualifyingSession, startTime: '2021-10-29T15:00:00-05:00', endTime: '2021-10-29T15:30:00-05:00', unconfirmed: true },
      { ...raceSession, startTime: '2021-10-30T15:45:00-05:00', endTime: '2021-10-30T16:20:00-05:00', unconfirmed: true }
    ],
    provisional: false
  },
]

export default races