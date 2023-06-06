import { Box } from '@/components/Box'
import { Heading } from '@/components/Heading'
import { MultiStep } from '@/components/MultiStep'
import { Text } from '@/components/Text'
import { RegisterForm } from './components/RegisterForm'

export default function Register() {
  return (
    <div className="mx-auto mb-4 mt-20 max-w-[572px] px-4">
      <header className="px-6">
        <Heading className="text-2xl leading-relaxed">
          Bem-vindo ao Ignite Call
        </Heading>
        <Text className="mb-6">
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>

        <MultiStep size={4} currentStep={1} />
      </header>

      <Box className="mt-6 flex flex-col gap-4">
        <RegisterForm />
      </Box>
    </div>
  )
}
