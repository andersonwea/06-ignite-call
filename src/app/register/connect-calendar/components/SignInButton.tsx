'use client'

import { Button } from '@/components/Button'
import { signIn } from 'next-auth/react'
import { ArrowRight } from 'phosphor-react'

export function SignInButton() {
  return (
    <Button
      secondary
      icon={<ArrowRight />}
      size="sm"
      onClick={() => signIn('google')}
    >
      Conectar
    </Button>
  )
}
