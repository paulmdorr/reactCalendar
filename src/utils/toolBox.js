// @flow
import { startOfMonth, endOfMonth, eachDay, subDays, addDays } from 'date-fns'

export function getDays(date: number): Date[] {
  const firstDay = startOfMonth(date)
  let extraBeforeDays = firstDay.getDay()
  let daysBefore = []
  const lastDay = endOfMonth(date)
  let extraAfterDays = 6 - lastDay.getDay()
  let daysAfter = []

  while (extraBeforeDays > 0) {
    daysBefore.push(subDays(firstDay, extraBeforeDays--))
  }

  while (extraAfterDays > 0) {
    daysAfter.push(addDays(lastDay, extraAfterDays--))
  }

  return [
    ...daysBefore,
    ...eachDay(startOfMonth(date), endOfMonth(date)),
    ...daysAfter,
  ]
}
