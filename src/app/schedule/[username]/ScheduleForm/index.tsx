import { CalendarStep } from './CalendarStep'
// import { ConfirmStep } from './ConfirmStep'

interface ScheduleFormProps {
  username: string
}

export function ScheduleForm({ username }: ScheduleFormProps) {
  return (
    <CalendarStep username={username} />
    // <ConfirmStep />
  )
}
