'use client'

import { useSearchParams } from 'next/navigation'

export function AuthError() {
  const searchParams = useSearchParams()

  const hasAuthError = searchParams.get('error')

  if (!hasAuthError) return null

  return (
    <p className="mb-2 font-default text-sm leading-relaxed text-[#f75a68]">
      Falha ao se conectar ao Google, verifique se você habilitou as permissões
      de acesso ao Google Calendar
    </p>
  )
}
