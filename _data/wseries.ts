import { Race, RaceStatus, Session } from '@/types/race'

const practiceSession: Session = {
  id: 'p',
  name: 'Practice',
  startTime: '',
  unconfirmed: false
};
const qualifyingSession: Session = {
  id: 'q',
  name: 'Qualifying',
  startTime: '',
  unconfirmed: false
};
const raceSession: Session = {
  id: 'r',
  name: 'Race',
  startTime: '',
  unconfirmed: false
};

const races: Race[] = [
  {
    id: 'styrian',
    name: 'Styrian',
    sessions: [
      { ...practiceSession, startTime: '2021-06-25T13:10:00+02:00' },
      { ...qualifyingSession, startTime: '2021-06-25T16:30:00+02:00' },
      { ...raceSession, startTime: '2021-06-26T16:30:00+02:00' }
    ],
    provisional: false,
    status: RaceStatus.COMPLETED
  },
  {
    id: 'austrian',
    name: 'Austrian',
    sessions: [
      { ...practiceSession, startTime: '2021-07-02T12:55:00+02:00' },
      { ...qualifyingSession, startTime: '2021-07-02T16:30:00+02:00' },
      { ...raceSession, startTime: '2021-07-03T16:30:00+02:00' }
    ],
    provisional: false,
    status: RaceStatus.COMPLETED
  },
  {
    id: 'british',
    name: 'British',
    sessions: [
      { ...practiceSession, startTime: '2021-07-16T11:00:00+01:00' },
      { ...qualifyingSession, startTime: '2021-07-16T16:05:00+01:00' },
      { ...raceSession, startTime: '2021-07-17T13:25:00+01:00' }
    ],
    provisional: false,
    status: RaceStatus.COMPLETED
  },
  {
    id: 'hungarian',
    name: 'Hungarian',
    sessions: [
      { ...practiceSession, startTime: '2021-07-30T12:55:00+02:00' },
      { ...qualifyingSession, startTime: '2021-07-30T16:30:00+02:00' },
      { ...raceSession, startTime: '2021-07-31T16:30:00+02:00' }
    ],
    provisional: false,
    status: RaceStatus.COMPLETED
  },
  {
    id: 'belgian',
    name: 'Belgian',
    sessions: [
      { ...practiceSession, startTime: '2021-08-27T12:55:00+02:00', unconfirmed: true },
      { ...qualifyingSession, startTime: '2021-08-27T16:30:00+02:00', unconfirmed: true },
      { ...raceSession, startTime: '2021-08-28T16:30:00+02:00', unconfirmed: true }
    ],
    provisional: false,
    status: RaceStatus.UPCOMING
  },
  {
    id: 'dutch',
    name: 'Dutch',
    sessions: [
      { ...practiceSession, startTime: '2021-09-03T12:55:00+02:00', unconfirmed: true },
      { ...qualifyingSession, startTime: '2021-09-03T16:30:00+02:00', unconfirmed: true },
      { ...raceSession, startTime: '2021-09-04T16:30:00+02:00', unconfirmed: true }
    ],
    provisional: false,
    status: RaceStatus.UPCOMING
  },
  {
    id: 'united-states',
    name: 'United States',
    sessions: [
      { ...practiceSession, startTime: '2021-10-22T14:00:00-05:00', unconfirmed: true },
      { ...qualifyingSession, startTime: '2021-10-22T17:00:00-05:00', unconfirmed: true },
      { ...raceSession, startTime: '2021-10-23T17:45:00-05:00', unconfirmed: true }
    ],
    provisional: false,
    status: RaceStatus.UPCOMING
  },
  {
    id: 'mexican',
    name: 'Mexican',
    sessions: [
      { ...practiceSession, startTime: '2021-10-29T12:00:00-05:00', unconfirmed: true },
      { ...qualifyingSession, startTime: '2021-10-29T15:00:00-05:00', unconfirmed: true },
      { ...raceSession, startTime: '2021-10-30T15:45:00-05:00', unconfirmed: true }
    ],
    provisional: false,
    status: RaceStatus.UPCOMING
  },
]

export default races