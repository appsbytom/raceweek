import { messaging } from '@/lib/firebase-admin'
import prisma from '@/lib/prisma'
import SERIES_CONFIG from '@/series/config'
import partition from '@/utils/partition'
import dayjs from 'dayjs'
import { NextApiRequest, NextApiResponse } from 'next'

const TOPICS = Object.keys(SERIES_CONFIG).flatMap(value => [`${value}-p`, `${value}-q`, `${value}-r`])

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.body.token || !req.body.topics) {
    return res.status(400).end()
  }
  const [subscribe, unsubscribe] = partition(TOPICS, item => req.body.topics.includes(item))
  await Promise.all([
    prisma.deviceToken.upsert({
      where: { id: req.body.token },
      create: { id: req.body.token, topics: subscribe, timestamp: dayjs().unix() },
      update: { topics: subscribe, timestamp: dayjs().unix() }
    }),
    ...subscribe.map(topic => messaging.subscribeToTopic(req.body.token, topic)),
    ...unsubscribe.map(topic => messaging.unsubscribeFromTopic(req.body.token, topic))
  ])
  res.json({ success: true })
}

export default handler