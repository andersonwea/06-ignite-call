import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const res = await request.json()

  const { username, name } = res

  const userExists = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (userExists) {
    return NextResponse.json(
      { message: 'User already exists' },
      { status: 400 },
    )
  }

  const user = await prisma.user.create({
    data: {
      name,
      username,
    },
  })

  return NextResponse.json({ user }, { status: 201 })
}
