import { Box } from '@/components/Box'
import { Heading } from '@/components/Heading'
import { MultiStep } from '@/components/MultiStep'
import { Text } from '@/components/Text'

import { getServerSession } from 'next-auth'
import { buildNextAuthOptions } from '@/app/api/auth/[...nextauth]/auth'
import { ConnectProvider } from './components/ConnectProvider'

export default async function ConnectCalendar() {
  const session = await getServerSession(buildNextAuthOptions())

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
          <ConnectProvider session={session} />
        </>
      </Box>
    </div>
  )
}
