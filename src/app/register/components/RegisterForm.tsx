'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/Button'
import { Text } from '@/components/Text'
import { TextInput } from '@/components/TextInput'
import ArrowRight from '@/assets/ArrowRight'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { api } from '@/lib/axios'
import { AxiosError } from 'axios'

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

  const router = useRouter()

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

      router.push('/register/connect-calendar')
    } catch (err) {
      if (err instanceof AxiosError && err?.response?.data?.message) {
        alert(err.response.data.message)
        return
      }
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

        {errors.username && (
          <Text className="text-sm" color="error">
            {errors.username.message}
          </Text>
        )}
      </label>

      <label className="space-y-2">
        <Text className="text-sm">Nome completo</Text>
        <TextInput placeholder="seu nome" {...register('name')} />

        {errors.name && (
          <Text className="text-sm" color="error">
            {errors.name.message}
          </Text>
        )}
      </label>

      <Button primary icon={<ArrowRight />} disabled={isSubmitting}>
        Próximo passo
      </Button>
    </form>
  )
}
