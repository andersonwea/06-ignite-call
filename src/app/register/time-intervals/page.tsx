import { Box } from '@/components/Box'
import { Heading } from '@/components/Heading'
import { MultiStep } from '@/components/MultiStep'
import { Text } from '@/components/Text'
import { IntervalForm } from './components/IntervalForm'

export default async function ConnectCalendar() {
  return (
    <div className="mx-auto mb-4 mt-20 max-w-[572px] px-4">
      <header className="px-6">
        <Heading className="text-2xl leading-relaxed">
          Defina sua disponibilidade
        </Heading>
        <Text className="mb-6" color="secondary">
          Defina o intervalo de horários que você está disponível em cada dia da
          semana.
        </Text>

        <MultiStep currentStep={3} />
      </header>

      <Box className="mt-6 flex flex-col">
        <IntervalForm />
      </Box>
    </div>
  )
}
