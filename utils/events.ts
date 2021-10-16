import Event from '@/types/event'
import dayjs from 'dayjs'

export const getFutureEvents = (events: Event[]) => events
  .filter(event => dayjs(event.sessions[event.sessions.length - 1].endTime).isSameOrAfter(dayjs()) || event.provisional)