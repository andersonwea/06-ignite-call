import { NextResponse, NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import { buildNextAuthOptions } from '@/app/api/auth/[...nextauth]/auth'

export async function POST(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(buildNextAuthOptions())

  return NextResponse.json({ session })
}
