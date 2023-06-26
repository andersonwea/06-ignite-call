import { ReactNode } from 'react'
import './globals.css'
import { Roboto } from 'next/font/google'
import { Session } from 'next-auth'
import { GoogleProvider, QueryProvider } from './providers'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
})

export const metadata = {
  title: 'Decomplique sua agenda | Ignite Call',
  description:
    'Conecte seu calendário e permita que a pessoas marquem agendamentos no seu tempo livre.',
}

export default function RootLayout({
  children,
  session,
}: {
  children: ReactNode
  session: Session
}) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <QueryProvider>
          <GoogleProvider session={session}>{children}</GoogleProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
