'use client'

import { Button } from '@/components/Button'
import { Text } from '@/components/Text'
import clsx from 'clsx'
import { Check, ArrowRight } from 'phosphor-react'
import { AuthError } from './AuthError'
import { Session } from 'next-auth'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface ConnectProviderProps {
  session: Session | null
}

export function ConnectProvider({ session }: ConnectProviderProps) {
  const router = useRouter()

  async function handleSignIn() {
    await signIn('google')
  }

  async function handleNavigateToNextStep() {
    await router.push('/register/time-intervals')
  }

  return (
    <>
      <div
        className={clsx(
          'mb-2 flex items-center justify-between rounded-md',
          'border border-solid border-gray-600 px-6 py-4',
        )}
      >
        <Text>Google Calendar</Text>

        {session ? (
          <Button size="sm" primary disabled icon={<Check />}>
            Conectado
          </Button>
        ) : (
          <Button
            secondary
            icon={<ArrowRight />}
            size="sm"
            onClick={handleSignIn}
          >
            Conectar
          </Button>
        )}
      </div>
      <AuthError />

      <Button
        primary
        icon={<ArrowRight />}
        disabled={!session}
        onClick={handleNavigateToNextStep}
      >
        Próximo passo
      </Button>
    </>
  )
}
