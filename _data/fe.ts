import { Race, RaceStatus, Session } from '@/types/race'

const practice1Session: Session = {
  id: 'p-1',
  name: 'Practice 1',
  startTime: '',
  unconfirmed: false
};
const practice2Session: Session = {
  id: 'p-2',
  name: 'Practice 2',
  startTime: '',
  unconfirmed: false
};
const qualifyingSession: Session = {
  id: 'q',
  name: 'Qualifying & Super Pole',
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
    id: 'diriyah-1',
    name: 'Diriyah E-Prix I',
    sessions: [
      { ...practice1Session, startTime: '2021-02-25T18:15:00+03:00' },
      { ...practice2Session, startTime: '2021-02-26T14:00:00+03:00' },
      { ...qualifyingSession, startTime: '2021-02-26T16:00:00+03:00' },
      { ...raceSession, startTime: '2021-02-26T20:03:00+03:00' }
    ],
    status: RaceStatus.COMPLETED,
    provisional: false
  },
  {
    id: 'diriyah-2',
    name: 'Diriyah E-Prix II',
    sessions: [
      { ...practice1Session, startTime: '2021-02-27T13:45:00+03:00' },
      { ...qualifyingSession, startTime: '2021-02-27T16:00:00+03:00' },
      { ...raceSession, startTime: '2021-02-27T20:03:00+03:00' }
    ],
    status: RaceStatus.COMPLETED,
    provisional: false
  },
  {
    id: 'rome-1',
    name: 'Rome E-Prix I',
    sessions: [
      { ...practice1Session, startTime: '2021-04-10T08:00:00+02:00' },
      { ...practice2Session, startTime: '2021-04-10T10:15:00+02:00' },
      { ...qualifyingSession, startTime: '2021-04-10T12:00:00+02:00' },
      { ...raceSession, startTime: '2021-04-10T16:04:00+02:00' }
    ],
    status: RaceStatus.COMPLETED,
    provisional: false
  },
  {
    id: 'rome-2',
    name: 'Rome E-Prix II',
    sessions: [
      { ...practice1Session, startTime: '2021-04-11T07:00:00+02:00' },
      { ...qualifyingSession, startTime: '2021-04-11T09:00:00+02:00' },
      { ...raceSession, startTime: '2021-04-11T13:04:00+02:00' }
    ],
    status: RaceStatus.COMPLETED,
    provisional: false
  },
  {
    id: 'valencia-1',
    name: 'Valencia E-Prix I',
    sessions: [
      { ...practice1Session, startTime: '2021-04-24T07:20:00+02:00' },
      { ...practice2Session, startTime: '2021-04-24T09:15:00+02:00' },
      { ...qualifyingSession, startTime: '2021-04-24T11:00:00+02:00' },
      { ...raceSession, startTime: '2021-04-24T15:04:00+02:00' }
    ],
    status: RaceStatus.COMPLETED,
    provisional: false
  },
  {
    id: 'valencia-2',
    name: 'Valencia E-Prix II',
    sessions: [
      { ...practice1Session, startTime: '2021-04-25T08:00:00+02:00' },
      { ...qualifyingSession, startTime: '2021-04-25T10:00:00+02:00' },
      { ...raceSession, startTime: '2021-04-25T14:04:00+02:00' }
    ],
    status: RaceStatus.COMPLETED,
    provisional: false
  },
  {
    id: 'monaco',
    name: 'Monaco E-Prix',
    sessions: [
      { ...practice1Session, startTime: '2021-05-08T08:00:00+02:00' },
      { ...practice2Session, startTime: '2021-05-08T10:15:00+02:00' },
      { ...qualifyingSession, startTime: '2021-05-08T12:00:00+02:00' },
      { ...raceSession, startTime: '2021-05-08T16:04:00+02:00' }
    ],
    status: RaceStatus.COMPLETED,
    provisional: false
  },
  {
    id: 'puebla-1',
    name: 'Puebla E-Prix I',
    sessions: [
      { ...practice1Session, startTime: '2021-06-19T08:00:00-05:00' },
      { ...practice2Session, startTime: '2021-06-19T10:15:00-05:00' },
      { ...qualifyingSession, startTime: '2021-06-19T12:00:00-05:00' },
      { ...raceSession, startTime: '2021-06-19T16:04:00-05:00' }
    ],
    status: RaceStatus.COMPLETED,
    provisional: false
  },
  {
    id: 'puebla-2',
    name: 'Puebla E-Prix II',
    sessions: [
      { ...practice1Session, startTime: '2021-06-20T09:15:00-05:00' },
      { ...qualifyingSession, startTime: '2021-06-20T12:00:00-05:00' },
      { ...raceSession, startTime: '2021-06-20T16:04:00-05:00' }
    ],
    status: RaceStatus.COMPLETED,
    provisional: false
  },
  {
    id: 'new-york-1',
    name: 'New York City E-Prix I',
    sessions: [
      { ...practice1Session, startTime: '2021-07-10T08:00:00-04:00' },
      { ...practice2Session, startTime: '2021-07-10T10:15:00-04:00' },
      { ...qualifyingSession, startTime: '2021-07-10T12:30:00-04:00' },
      { ...raceSession, startTime: '2021-07-10T16:34:00-04:00' }
    ],
    status: RaceStatus.COMPLETED,
    provisional: false
  },
  {
    id: 'new-york-2',
    name: 'New York City E-Prix II',
    sessions: [
      { ...practice1Session, startTime: '2021-07-11T07:15:00-04:00' },
      { ...qualifyingSession, startTime: '2021-07-11T09:30:00-04:00' },
      { ...raceSession, startTime: '2021-07-11T13:34:00-04:00' }
    ],
    status: RaceStatus.COMPLETED,
    provisional: false
  },
  {
    id: 'london-1',
    name: 'London E-Prix I',
    sessions: [
      { ...practice1Session, startTime: '2021-07-23T17:00:00+01:00' },
      { ...practice2Session, startTime: '2021-07-24T09:00:00+01:00' },
      { ...qualifyingSession, startTime: '2021-07-24T11:00:00+01:00' },
      { ...raceSession, startTime: '2021-07-24T15:03:00+01:00' }
    ],
    status: RaceStatus.COMPLETED,
    provisional: false
  },
  {
    id: 'london-2',
    name: 'London E-Prix II',
    sessions: [
      { ...practice1Session, startTime: '2021-07-25T08:00:00+01:00' },
      { ...qualifyingSession, startTime: '2021-07-25T10:00:00+01:00' },
      { ...raceSession, startTime: '2021-07-25T14:04:00+01:00' }
    ],
    status: RaceStatus.COMPLETED,
    provisional: false
  },
  {
    id: 'berlin-1',
    name: 'Berlin E-Prix I',
    sessions: [
      { ...practice1Session, startTime: '2021-08-13T17:00:00+02:00' },
      { ...practice2Session, startTime: '2021-08-14T08:00:00+02:00' },
      { ...qualifyingSession, startTime: '2021-08-14T10:00:00+02:00' },
      { ...raceSession, startTime: '2021-08-14T14:04:00+02:00' }
    ],
    status: RaceStatus.UPCOMING,
    provisional: false
  },
  {
    id: 'berlin-2',
    name: 'Berlin E-Prix II',
    sessions: [
      { ...practice1Session, startTime: '2021-08-15T08:00:00+02:00' },
      { ...practice2Session, startTime: '2021-08-15T09:30:00+02:00' },
      { ...qualifyingSession, startTime: '2021-08-15T11:30:00+02:00' },
      { ...raceSession, startTime: '2021-08-15T15:34:00+02:00' }
    ],
    status: RaceStatus.UPCOMING,
    provisional: false
  }
]

export default races