import dayjs from 'dayjs'
import profileStore from '@/stores/profile'

const formats = {
  dateTime: 'll HH:mm:ss',
  date: 'll',
  time: 'HH:mm:ss'
}

export function dateTime (
  value
) {
  return dateTimeLocalized(
    value,
    'dateTime'
  )
}

function dateTimeLocalized (
  value,
  scope
) {
  const isOnlyYear = (
    value.toString().length === 4
  )

  if (isOnlyYear) {
    return value
  }

  const {
    timezone,
    language
  } = profileStore()

  const format = formats[scope]

  return dayjs.utc(
    value
  ).tz(
    timezone
  ).locale(
    language
  ).format(
    format
  )
}

export function date (
  value
) {
  return dateTimeLocalized(
    value,
    'date'
  )
}

export function time (
  value
) {
  return dateTimeLocalized(
    value,
    'time'
  )
}

export function birthdate (
  value
) {
  if (value) {
    return dayjs(
      value
    ).format(
      'YYYY-MM-DD'
    )
  } else {
    return null
  }
}

export function currentTime () {
  return dayjs.utc().format()
}

export function seconds (
  value
) {
  const isWithHours = (
    value >= 3600
  )

  const format = (
    isWithHours ? 'H:mm:ss' : 'mm:ss'
  )

  return dayjs.duration(
    value,
    'seconds'
  ).format(
    format
  )
}

export function age (
  value
) {
  return dayjs().diff(
    value,
    'year'
  ).toString()
}
