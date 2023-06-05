import { Box } from '@/components/Box'
import ArrowRight from '../../../components/ArrowRight'
import { Button } from '../../../components/Button'
import { TextInput } from '../../../components/TextInput'

export function ClaimUsernameForm() {
  return (
    <Box className="mt-4 ">
      <form className="grid grid-cols-2 items-center gap-2 max-sm:grid-cols-1">
        <TextInput prefix="ignite.com/" placeholder="seu-usuario" />
        <Button size="sm" type="submit" icon={<ArrowRight />}>
          Reservar usuário
        </Button>
      </form>
    </Box>
  )
}
