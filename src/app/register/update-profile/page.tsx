import { Box } from '@/components/Box'
import { Heading } from '@/components/Heading'
import { MultiStep } from '@/components/MultiStep'
import { Text } from '@/components/Text'
import { UpdateProfile } from '../components/UpdateProfile'
import { getServerSession } from 'next-auth'
import { buildNextAuthOptions } from '@/app/api/auth/[...nextauth]/auth'
import { Avatar } from '@/components/Avatar'

export const metadata = {
  title: 'Atualize seu perfil | Ignite Call',
}

export default async function Register() {
  const session = await getServerSession(buildNextAuthOptions())

  return (
    <div className="mx-auto mb-4 mt-20 max-w-[572px] px-4">
      <header className="px-6">
        <Heading className="text-2xl leading-relaxed">Quase lá</Heading>
        <Text className="mb-6" color="secondary">
          Por último, uma breve descrição e uma foto de perfil.
        </Text>

        <MultiStep currentStep={4} />
      </header>

      <Box className="mt-6 flex flex-col gap-4">
        <>
          <label>
            <Text className="text-sm">Foto de perfil</Text>
            <Avatar
              src={session?.user.avatar_url}
              alt={session?.user.name}
              className="mt-2"
            />
          </label>
          <UpdateProfile username={session?.user.username} />
        </>
      </Box>
    </div>
  )
}
