import dayjs from 'dayjs'

export function date (
  value
) {
  if (value) {
    return dayjs(
      value
    ).toDate()
  } else {
    return null
  }
}
