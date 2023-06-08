import { Box } from '@/components/Box'
import { Button } from '@/components/Button'
import { Heading } from '@/components/Heading'
import { MultiStep } from '@/components/MultiStep'
import { Text } from '@/components/Text'
import clsx from 'clsx'
import ArrowRight from '@/assets/ArrowRight'
import Check from '@/assets/Check'

import { SignInButton } from './components/SignInButton'
import { AuthError } from './components/AuthError'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export default async function ConnectCalendar() {
  const session = await getServerSession(authOptions)

  console.log(session)

  return (
    <div className="mx-auto mb-4 mt-20 max-w-[572px] px-4">
      <header className="px-6">
        <Heading className="text-2xl leading-relaxed">
          Conecte sua agenda!
        </Heading>
        <Text className="mb-6">
          Conecte o seu calendário para verificar automaticamente as horas
          ocupadas e os novos eventos à medida em que são agendados.
        </Text>

        <MultiStep currentStep={2} />
      </header>

      <Box className="mt-6 flex flex-col gap-4">
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
              <SignInButton />
            )}
          </div>
          <AuthError />

          <Button primary icon={<ArrowRight />} disabled={!session}>
            Próximo passo
          </Button>
        </>
      </Box>
    </div>
  )
}
