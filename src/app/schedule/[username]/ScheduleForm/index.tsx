'use client'

import { useState } from 'react'
import { CalendarStep } from './CalendarStep'
import { ConfirmStep } from './ConfirmStep'
// import { ConfirmStep } from './ConfirmStep'

interface ScheduleFormProps {
  username: string
}

export function ScheduleForm({ username }: ScheduleFormProps) {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>()

  function handleClearSelectedDateTime() {
    setSelectedDateTime(null)
  }

  if (selectedDateTime) {
    return (
      <ConfirmStep
        schedulingDate={selectedDateTime}
        onCancelConfirmation={handleClearSelectedDateTime}
      />
    )
  }

  return (
    <CalendarStep username={username} onSelectDateTime={setSelectedDateTime} />
  )
}
