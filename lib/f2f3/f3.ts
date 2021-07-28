import { client } from './client'
import { RacesResponse } from './types'
import { mapResponseToData } from './mapper'

const f3Client = client(process.env.F3_KEY)

export const getRaces = async () => {
  const { data } = await f3Client.get<RacesResponse>(`/races?website=f3`)

  return mapResponseToData(data)
}