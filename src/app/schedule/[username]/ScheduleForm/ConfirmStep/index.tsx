'use client'

import { Box } from '@/components/Box'
import { Text } from '@/components/Text'
import CalendarBlank from '@/assets/CalendarBlank'
import Clock from '@/assets/Clock'
import { TextInput } from '@/components/TextInput'
import { TextArea } from '@/components/TextArea'
import { Button } from '@/components/Button'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const confirmFormSchema = z.object({
  name: z.string().min(3, 'O nome precisar ter no mínimo 3 caracteres'),
  email: z.string().email('Digite um email válido'),
  tel: z.string().min(10, 'Digite um telefone com DDD'),
  observation: z.string().nullable(),
})

interface confirmFormData extends z.infer<typeof confirmFormSchema> {}

export function ConfirmStep() {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm<confirmFormData>({
    resolver: zodResolver(confirmFormSchema),
  })

  function handleConfirmScheduling(data: confirmFormData) {
    console.log(data)
  }

  return (
    <Box className="mx-auto mb-0 mt-6 max-w-[540px]">
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(handleConfirmScheduling)}
      >
        <header className="mt-2 flex items-center gap-4 border-b border-solid border-gray-600 pb-6">
          <h2 className="flex items-center gap-2 font-default leading-relaxed text-gray-100">
            <CalendarBlank size={20} color="#A9A9B2" />
            22 de semtembro de 2022
          </h2>
          <h2 className="flex items-center gap-2 font-default leading-relaxed text-gray-100">
            <Clock size={20} color="#A9A9B2" />
            18:00h
          </h2>
        </header>

        <label className="flex flex-col gap-2">
          <Text className="text-sm">Nome completo</Text>
          <TextInput placeholder="Seu nome" {...register('name')} />
          {errors.name && (
            <Text color="error" className="text-sm">
              {errors.name.message}
            </Text>
          )}
        </label>

        <label className="flex flex-col gap-2">
          <Text className="text-sm">Endereço de e-mail</Text>
          <TextInput placeholder="jonhdoe@example.com" {...register('email')} />
          {errors.email && (
            <Text color="error" className="text-sm">
              {errors.email.message}
            </Text>
          )}
        </label>

        <label className="flex flex-col gap-2">
          <Text className="text-sm">Telefone</Text>
          <TextInput placeholder="11999999999" {...register('tel')} />
          {errors.tel && (
            <Text color="error" className="text-sm">
              {errors.tel.message}
            </Text>
          )}
        </label>

        <label className="flex flex-col gap-2">
          <Text className="text-sm">Observações</Text>
          <TextArea {...register('observation')} />
        </label>

        <div className="mt-2 flex justify-end gap-2">
          <Button tertiary type="button">
            Cancelar
          </Button>
          <Button primary type="submit" disabled={isSubmitting}>
            Confirmar
          </Button>
        </div>
      </form>
    </Box>
  )
}
