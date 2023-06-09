import { NextResponse, NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import { buildNextAuthOptions } from '@/app/api/auth/[...nextauth]/auth'
import * as z from 'zod'
import { prisma } from '@/lib/prisma'

const timeIntervalsBodySchema = z.object({
  intervals: z.array(
    z.object({
      weekDay: z.number(),
      startTimeInMinutes: z.number(),
      endTimeInMinutes: z.number(),
    }),
  ),
})

export async function POST(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(buildNextAuthOptions())

  if (!session) {
    return NextResponse.json({ status: 401 })
  }

  const data = await req.json()

  const { intervals } = timeIntervalsBodySchema.parse(data)

  await Promise.all(
    intervals.map((interval) => {
      return prisma.userTimeInterval.create({
        data: {
          week_day: interval.weekDay,
          time_start_in_minutes: interval.startTimeInMinutes,
          time_end_in_minutes: interval.endTimeInMinutes,
          user_id: session.user.id,
        },
      })
    }),
  )

  return NextResponse.json({}, { status: 201 })
}
