'use client'

import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Box } from '@/components/Box'
import ArrowRight from '@/assets/ArrowRight'
import { Button } from '@/components/Button'
import { TextInput } from '@/components/TextInput'
import { Text } from '@/components/Text'

const claimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário precisa ter pelo menos 3 letras' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O usuário só pode ter letras e hifens',
    })
    .transform((username) => username.toLowerCase()),
})

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>

export function ClaimUsernameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(claimUsernameFormSchema),
  })

  function handleClaimUsername(data: ClaimUsernameFormData) {
    console.log(data)
  }

  return (
    <>
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

      <div className="mt-2">
        <Text className="text-sm">
          {errors.username?.message ?? 'Digite um nome de usuário'}
        </Text>
      </div>
    </>
  )
}
