import { Series } from '@/types/event'
import { client } from './client'
import { mapResponseToData } from './mapper'
import { RacesResponse } from './types'

const f3Client = client(process.env.F3_KEY)

export const getEvents = async () => {
  const { data } = await f3Client.get<RacesResponse>(`/races?website=f3`)

  return mapResponseToData(data, Series.F3)
}