import clsx from 'clsx'
import { Text } from './Text'

interface MultiStepProps {
  size: number
  currentStep?: number
}

export function MultiStep({ size, currentStep = 1 }: MultiStepProps) {
  const step = `Passo ${currentStep} de ${size}`

  return (
    <div>
      <Text className="text-xs">{step}</Text>
      <div className={clsx('mt-1 grid gap-2', `grid-cols-${size}`)}>
        {Array.from({ length: size }, (_, i) => i + 1).map((step) => {
          return (
            <div
              key={step}
              className={clsx('h-1 rounded-[1px]', {
                'bg-gray-600': currentStep < step,
                'bg-gray-100': currentStep >= step,
              })}
            ></div>
          )
        })}
      </div>
    </div>
  )
}
