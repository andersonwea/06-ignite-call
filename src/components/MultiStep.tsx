import clsx from 'clsx'
import { Text } from './Text'

interface MultiStepProps {
  currentStep?: number
}

export function MultiStep({ currentStep = 1 }: MultiStepProps) {
  const size = 4

  return (
    <div>
      <Text className="text-xs">{`Passo ${currentStep} de ${size}`}</Text>
      <div className={`mt-1 grid grid-cols-4 gap-2`}>
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
