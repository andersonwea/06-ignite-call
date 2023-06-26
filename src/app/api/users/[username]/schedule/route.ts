import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'
import { NextRequest, NextResponse } from 'next/server'
import * as z from 'zod'

interface Props {
  params: {
    username: string
  }
}

const createSchedulingBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  tel: z.string(),
  observation: z.string(),
  date: z.string().datetime(),
})

export async function POST(req: NextRequest, context: Props) {
  const username = context.params.username

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    return NextResponse.json(
      { message: 'User does not exists' },
      { status: 400 },
    )
  }

  const { name, email, tel, observation, date } =
    createSchedulingBodySchema.parse(await req.json())

  const schedulingDate = dayjs(date).startOf('hour')

  if (schedulingDate.isBefore(new Date())) {
    return NextResponse.json(
      { message: 'Date is in the past.' },
      { status: 400 },
    )
  }

  const conflictingScheduling = await prisma.scheduling.findFirst({
    where: {
      user_id: user.id,
      date: schedulingDate.toDate(),
    },
  })

  if (conflictingScheduling) {
    return NextResponse.json(
      { message: 'There is another scheduling at the same time' },
      { status: 400 },
    )
  }

  await prisma.scheduling.create({
    data: {
      name,
      email,
      tel,
      observation,
      date: schedulingDate.toDate(),
      user_id: user.id,
    },
  })

  return NextResponse.json({}, { status: 201 })
}
