import { client } from './client'
import { RacesResponse } from './types'
import { mapResponseToData } from './mapper'

const f2Client = client(process.env.F2_KEY)

export const getRaces = async () => {
  const { data } = await f2Client.get<RacesResponse>(`/races?website=f2`)

  return mapResponseToData(data)
}