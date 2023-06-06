import { Text } from '@/components/Text'

interface FormErrorProps {
  children: string | undefined
}

export function FormError({ children }: FormErrorProps) {
  return <Text className="text-sm text-[#f75a68]">{children}</Text>
}
