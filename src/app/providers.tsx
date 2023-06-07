'use client'

import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'
import { Session } from 'next-auth'

interface GoogleProviderProps {
  children: ReactNode
  session: Session | null
}

export function GoogleProvider({ children, session }: GoogleProviderProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>
}
