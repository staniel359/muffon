import {
  calendarData as formatCalendarData
} from '@/helpers/formatters'

export function main (
  {
    startDate,
    onChange
  }
) {
  const calendarData =
    formatCalendarData(
      {
        startDate
      }
    )

  const {
    days,
    months,
    monthsShort,
    minDate,
    maxDate,
    initialDate
  } = calendarData

  return {
    firstDayOfWeek: 1,
    monthFirst: false,
    startMode: 'year',
    type: 'date',
    popupOptions: {
      position: 'top left'
    },
    text: {
      days,
      months,
      monthsShort
    },
    minDate,
    maxDate,
    initialDate,
    onChange
  }
}
