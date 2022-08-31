import prisma from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await unstable_getServerSession(req, res, authOptions)

  if (!session || req.query.id !== session.user.id) return res.status(401).end()

  const idProvider = { id: session.user.id, provider: session.user.provider }

  if (req.method === 'GET') {
    const preference = await prisma.preference.findUnique({ where: { id_provider: idProvider }})

    return res.json(preference)
  } else if (req.method === 'PUT') {
    const preferenceBody = {
      timezone: req.body.timezone,
      use24HourFormat: req.body.use24HourFormat,
      followedSessions: req.body.followedSessions
    }
    const preference = await prisma.preference.upsert({
      where: { id_provider: idProvider },
      update: preferenceBody,
      create: { ...idProvider, ...preferenceBody }
    })
    return res.json(preference)
  } else {
    res.setHeader('Allow', ['GET', 'PUT'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}