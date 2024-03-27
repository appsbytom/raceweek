import { messaging } from '@/lib/firebase-admin'
import prisma from '@/lib/prisma'
import dayjs from 'dayjs'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const reminders = await prisma.sessionReminder.findMany({ where: { scheduledFor: { lte: dayjs().unix() } } })

  if (reminders.length === 0) {
    return res.json({ success: true, message: 'No reminders to send' })
  }
  await Promise.all([
    messaging.sendEach(reminders.map(reminder => ({
      notification: { title: reminder.title, body: reminder.body },
      topic: reminder.topic,
      webpush: {
        headers: {
          Urgency: 'high',
          TTL: '300'
        },
      },
    }))),
    prisma.sessionReminder.deleteMany({ where: { id: { in: reminders.map(reminder => reminder.id) } } })
  ])
  res.json({ success: true })
}

export default handler