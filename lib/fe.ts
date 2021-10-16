import Event from '@/types/event'
import { getFutureEvents } from '@/utils/events'
import data from '../_data/fe'

export const getEvents = (): Event[] => getFutureEvents(data)