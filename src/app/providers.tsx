'use client'

import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'
import { Session } from 'next-auth'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/react-query'

interface GoogleProviderProps {
  children: ReactNode
  session: Session | null
}

interface QueryProviderProps {
  children: ReactNode
}

export function GoogleProvider({ children, session }: GoogleProviderProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>
}

export function QueryProvider({ children }: QueryProviderProps) {
  // const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
