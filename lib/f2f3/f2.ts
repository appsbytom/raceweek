import { Series } from '@/types/event'
import { client } from './client'
import { mapResponseToData } from './mapper'
import { RacesResponse } from './types'

const f2Client = client(process.env.F2_KEY)

export const getEvents = async () => {
  const { data } = await f2Client.get<RacesResponse>(`/races?website=f2`)

  return mapResponseToData(data, Series.F2)
}