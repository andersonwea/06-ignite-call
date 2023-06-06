'use client'

import { Box } from '@/components/Box'
import ArrowRight from '@/components/ArrowRight'
import { Button } from '@/components/Button'
import { TextInput } from '@/components/TextInput'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const claimUsernameFormSchema = z.object({
  username: z.string(),
})

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>

export function ClaimUsernameForm() {
  const { register, handleSubmit } = useForm<ClaimUsernameFormData>()

  function handleClaimUsername(data: ClaimUsernameFormData) {
    console.log(data)
  }

  return (
    <Box className="mt-4 ">
      <form
        onSubmit={handleSubmit(handleClaimUsername)}
        className="grid grid-cols-2 items-center gap-2 max-sm:grid-cols-1"
      >
        <TextInput
          prefix="ignite.com/"
          placeholder="seu-usuario"
          {...register('username')}
        />
        <Button size="sm" type="submit" icon={<ArrowRight />}>
          Reservar usuário
        </Button>
      </form>
    </Box>
  )
}
