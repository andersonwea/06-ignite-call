'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/Button'
import { Text } from '@/components/Text'
import { TextInput } from '@/components/TextInput'
import ArrowRight from '@/assets/ArrowRight'
import { FormError } from './FormError'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { api } from '@/lib/axios'

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário precisa ter pelo menos 3 letras' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O usuário só pode ter letras e hifens',
    })
    .transform((username) => username.toLowerCase()),
  name: z
    .string()
    .min(3, { message: 'O nome precisa ter pelo menos 3 letras' }),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })

  const searchParams = useSearchParams()

  const username = searchParams.get('username')

  useEffect(() => {
    if (username) {
      setValue('username', username)
    }
  }, [username, setValue])

  async function handleRegisterUser(data: RegisterFormData) {
    try {
      await api.post('/users', {
        name: data.name,
        username: data.username,
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(handleRegisterUser)}
    >
      <label className="space-y-2">
        <Text className="text-sm">Nome de usuário</Text>
        <TextInput
          prefix="ignite.com/"
          placeholder="seu-usuario"
          {...register('username')}
        />

        {errors.username && <FormError>{errors.username.message}</FormError>}
      </label>

      <label className="space-y-2">
        <Text className="text-sm">Nome completo</Text>
        <TextInput placeholder="seu nome" {...register('name')} />

        {errors.name && <FormError>{errors.name.message}</FormError>}
      </label>

      <Button icon={<ArrowRight />} disabled={isSubmitting}>
        Próximo passo
      </Button>
    </form>
  )
}
