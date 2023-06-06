import { Box } from '@/components/Box'
import { Button } from '@/components/Button'
import { Heading } from '@/components/Heading'
import { MultiStep } from '@/components/MultiStep'
import { Text } from '@/components/Text'
import { TextInput } from '@/components/TextInput'
import ArrowRight from '@/assets/ArrowRight'

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
        <form className="flex flex-col gap-4">
          <label className="space-y-2">
            <Text className="text-sm">Nome de usuário</Text>
            <TextInput prefix="ignite.com/" placeholder="seu-usuario" />
          </label>

          <label className="space-y-2">
            <Text className="text-sm">Nome completo</Text>
            <TextInput placeholder="seu nome" />
          </label>

          <Button icon={<ArrowRight />}>Próximo passo</Button>
        </form>
      </Box>
    </div>
  )
}
