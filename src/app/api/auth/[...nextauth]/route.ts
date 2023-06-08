import { buildNextAuthOptions } from '@/app/api/auth/[...nextauth]/auth'
import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, buildNextAuthOptions(req, res))
}

export { handler as GET, handler as POST }
