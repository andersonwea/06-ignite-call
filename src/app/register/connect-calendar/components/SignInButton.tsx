'use client'

import { Button } from '@/components/Button'
import { signIn } from 'next-auth/react'
import { ArrowRight } from 'phosphor-react'

export function SignInButton() {
  async function handleSignIn() {
    await signIn('google')
  }

  return (
    <Button secondary icon={<ArrowRight />} size="sm" onClick={handleSignIn}>
      Conectar
    </Button>
  )
}
