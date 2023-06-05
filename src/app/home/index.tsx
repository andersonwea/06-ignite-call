import { Heading } from '@/components/Heading'
import { Text } from '@/components/Text'
import Image from 'next/image'

import previewImage from '@/assets/app-preview.png'
import clsx from 'clsx'

export default function Home() {
  return (
    <div
      className={clsx(
        'ml-auto flex h-screen items-center gap-24',
        'max-w-[calc(100vw-((100vw-1160px)/2))]',
      )}
    >
      <div className="max-w-[480px] px-10">
        <Heading className="text-6xl max-sm:text-5xl" as="h1">
          Agendamento descomplicado
        </Heading>
        <Text className="mt-2 text-lg">
          Conecte seu calendário e permita que as pessoas marquem agendamentos
          no seu tempo livre.
        </Text>
      </div>

      <div className="overflow-hidden p-8 max-sm:hidden">
        <Image
          className="min-w-[827px]"
          src={previewImage}
          height={440}
          quality={100}
          priority
          alt="Calendário que demonstra a funcionalidade do aplicativo"
        />
      </div>
    </div>
  )
}
