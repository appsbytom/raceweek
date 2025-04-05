import Event from '@/types/event';
import { Type } from '@/types/session';
import dayjs from 'dayjs';
import { Series } from '../config';

const getSessionType = (guid: string) => {
  if (guid.includes('rxq')) return Type.Qualifying
  if (guid.includes('rxsemi') || guid.includes('rxfinal')) return Type.Race
}

export default async (): Promise<Event[]> => {
  const { content } = await (await fetch(`https://api.rally.tv/content/filters/calendar?championship=wrx&year=${dayjs().year()}`)).json()
  return await Promise.all(content.map(async event => {
    let sessions = []
    if (event.seriesUid) {
      const { content: sessionContent } = await (await fetch(`https://api.rally.tv/content/filters/schedule?byListingTime=${event.startDate}~${event.endDate}&seriesUid=${event.seriesUid}`)).json()
      sessions = sessionContent.filter(session => /_rx[a-z]{1}/.test(session.contentGuid)).map(session => ({
        id: session.uid,
        name: session.title.replace('World RX', ''),
        type: getSessionType(session.contentGuid),
        startTime: dayjs(session.availableOn).toISOString(),
        endTime: dayjs(session.availableTill).toISOString(),
        unconfirmed: false,
      }))
    }
    return {
      id: event.uid,
      name: event.title,
      sessions,
      provisional: sessions.length === 0,
      series: Series.WRX,
      raceDate: dayjs(event.startDate).toISOString()
    }
  }))
}