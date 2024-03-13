import prisma from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from "next"
import dayjs from 'dayjs'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.json(await prisma.sessionReminder.findMany({ select: { id: true }, where: { scheduledFor: { lte: dayjs().unix() }}}))
}

export default handler