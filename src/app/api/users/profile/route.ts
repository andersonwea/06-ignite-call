import { NextResponse, NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import { buildNextAuthOptions } from '@/app/api/auth/[...nextauth]/auth'
import * as z from 'zod'
import { prisma } from '@/lib/prisma'

const updateProfileBodySchema = z.object({
  bio: z.string(),
})

export async function PUT(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(buildNextAuthOptions())

  if (!session) {
    return NextResponse.json({ status: 401 })
  }

  const data = await req.json()

  const { bio } = updateProfileBodySchema.parse(data)

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      bio,
    },
  })

  return NextResponse.json({}, { status: 201 })
}
