'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/Button'
import { Text } from '@/components/Text'
import ArrowRight from '@/assets/ArrowRight'
import { TextArea } from '@/components/TextArea'
import { api } from '@/lib/axios'
import { useRouter } from 'next/navigation'

const updateProfileFormSchema = z.object({
  bio: z.string(),
})

type UpdateProfileFormData = z.infer<typeof updateProfileFormSchema>

interface UpdateProfileProps {
  username: string | undefined
}

export function UpdateProfile({ username }: UpdateProfileProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileFormSchema),
  })

  const router = useRouter()

  async function handleUpdateProfile(data: UpdateProfileFormData) {
    await api.put('/users/profile', {
      bio: data.bio,
    })

    await router.push(`/schedule/${username}`)
  }

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(handleUpdateProfile)}
    >
      <label className="space-y-2">
        <Text className="text-sm">Sobre você</Text>
        <TextArea
          placeholder="Fale um pouco sobre você. Isto será exibido em sua página pessoal."
          {...register('bio')}
        />
      </label>

      <Button primary icon={<ArrowRight />} disabled={isSubmitting}>
        Finalizar
      </Button>
    </form>
  )
}
