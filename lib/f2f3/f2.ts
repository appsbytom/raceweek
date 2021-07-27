import { client } from './client'
import { RacesResponse } from './types'
import { mapResponseToData } from './mapper'

const f2Client = client(process.env.F2_KEY)
const RACES_ENDPOINT = `/races?website=f2`

export const getRaces = async () => {
  const { data } = await f2Client.get<RacesResponse>(RACES_ENDPOINT)

  return mapResponseToData(data)
}