import { Avatar } from '@/components/Avatar'
import { Heading } from '@/components/Heading'
import { Text } from '@/components/Text'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { ScheduleForm } from './ScheduleForm'

interface ScheduleProps {
  params: {
    username: string
  }
}

export const revalidate = 60 * 60 * 24 // 1 day

export async function generateStaticParams({ params }: ScheduleProps) {
  const { username } = params

  const users = await prisma.user.findMany({
    where: {
      username,
    },
  })
  return users.map((user) => ({
    username: user.username,
  }))
}

export default async function Schedule({ params }: ScheduleProps) {
  const { username } = params

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    notFound()
  }

  return (
    <div className="mx-auto mb-4 mt-20 max-w-[852px] px-4 py-0">
      <header className="flex flex-col items-center">
        <Avatar src={user.avatar_url ?? undefined} />
        <Heading className="mt-2 text-2xl leading-snug">{user.name}</Heading>
        <Text color="secondary">{user.bio}</Text>
      </header>

      <ScheduleForm username={username} />
    </div>
  )
}
