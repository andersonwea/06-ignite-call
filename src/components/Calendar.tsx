'use client'

import '@/lib/dayjs'
import CaretLeft from '@/assets/CaretLeft'
import CaretRight from '@/assets/CaretRight'
import { getWeekDays } from '@/utils/get-week-days'
import { CalendarDay } from './CalendarDay'
import { useMemo, useState } from 'react'
import dayjs from 'dayjs'
import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'

interface CalendarWeek {
  week: number
  days: Array<{
    date: dayjs.Dayjs
    disabled: boolean
  }>
}

type CalendarWeeks = CalendarWeek[]

interface CalendarProps {
  username: string
  selectedDate: Date | null
  onDateSelected: (date: Date) => void
}

interface BlockedDates {
  blockedWeekDays: number[]
}

export function Calendar({
  selectedDate,
  onDateSelected,
  username,
}: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set('date', 1)
  })

  function handlePreviousMonth() {
    const previousMonthDate = currentDate.subtract(1, 'month')

    setCurrentDate(previousMonthDate)
  }

  function handleNextMonth() {
    const previousMonthDate = currentDate.add(1, 'month')

    setCurrentDate(previousMonthDate)
  }

  const shortWeekDays = getWeekDays({ short: true })

  const currentMonth = currentDate.format('MMMM')
  const currentYear = currentDate.format('YYYY')

  const { data: blockedDates } = useQuery<BlockedDates>(
    ['blocked-dates', currentDate.get('year'), currentDate.get('month')],
    async () => {
      const response = await api.get(`users/${username}/blocked-dates`, {
        params: {
          year: currentDate.get('year'),
          month: currentDate.get('month'),
        },
      })

      return response.data
    },
  )

  // const blockedDay = blockedDates ? blockedDates.blockedWeekDays.includes(date.get('day'))

  const calendarWeeks = useMemo(() => {
    if (!blockedDates) {
      return []
    }

    const daysInMonthArray = Array.from({
      length: currentDate.daysInMonth(),
    }).map((_, i) => {
      return currentDate.set('date', i + 1)
    })

    const firstWeekDay = currentDate.get('day')

    const previousMonthFillArray = Array.from({
      length: firstWeekDay,
    })
      .map((_, i) => {
        return currentDate.subtract(i + 1, 'day')
      })
      .reverse()

    const lastDayCurrentMonth = currentDate.set(
      'date',
      currentDate.daysInMonth(),
    )

    const lastWeekDay = lastDayCurrentMonth.get('day')

    const nextMonthFillArray = Array.from({
      length: 7 - (lastWeekDay + 1),
    }).map((_, i) => {
      return lastDayCurrentMonth.add(i + 1, 'day')
    })

    const calendarDays = [
      ...previousMonthFillArray.map((date) => {
        return {
          date,
          disabled: true,
        }
      }),
      ...daysInMonthArray.map((date) => {
        return {
          date,
          disabled:
            date.endOf('day').isBefore(new Date()) ||
            blockedDates.blockedWeekDays.includes(date.get('day')),
        }
      }),
      ...nextMonthFillArray.map((date) => {
        return {
          date,
          disabled: true,
        }
      }),
    ]

    const calendarWeeks = calendarDays.reduce<CalendarWeeks>(
      (weeks, _, i, original) => {
        const isNewWeek = i % 7 === 0

        if (isNewWeek) {
          weeks.push({
            week: i / 7 + 1,
            days: original.slice(i, i + 7),
          })
        }

        return weeks
      },
      [],
    )

    return calendarWeeks
  }, [currentDate, blockedDates])

  return (
    <div className="flex flex-col gap-6 p-6">
      <header className="flex items-center justify-between">
        <h2 className="m-0 font-default capitalize leading-relaxed text-gray-100">
          {currentMonth} <span className="text-gray-200">{currentYear}</span>
        </h2>

        <div className="flex gap-2 text-gray-200">
          <button
            className="rounded-md border-0 leading-[0] hover:text-gray-100 focus:shadow-[0_0_0_2px] focus:shadow-gray-100"
            onClick={handlePreviousMonth}
            title="Mês anterior"
          >
            <CaretLeft size={20} />
          </button>
          <button
            className="rounded-md border-0 leading-[0] hover:text-gray-100 focus:shadow-[0_0_0_2px] focus:shadow-gray-100"
            onClick={handleNextMonth}
            title="Mês Seguinte"
          >
            <CaretRight size={20} />
          </button>
        </div>
      </header>

      <table className="w-full table-fixed border-separate border-spacing-1 font-default">
        <thead>
          <tr>
            {shortWeekDays.map((weekDay) => {
              return (
                <th key={weekDay} className="text-sm font-medium text-gray-200">
                  {weekDay}.
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody className="before:block before:leading-3 before:text-gray-800 before:content-['.'] ">
          {calendarWeeks.map(({ week, days }) => {
            return (
              <tr key={week}>
                {days.map(({ date, disabled }) => {
                  return (
                    <td key={date.toString()}>
                      <CalendarDay
                        disabled={disabled}
                        onClick={() => onDateSelected(date.toDate())}
                      >
                        {date.get('date')}
                      </CalendarDay>
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
