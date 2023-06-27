import { buildNextAuthOptions } from '@/app/api/auth/[...nextauth]/auth'
import NextAuth from 'next-auth'

const handler = NextAuth(buildNextAuthOptions())

export { handler as GET, handler as POST }
