import dayjs from 'dayjs'

export function currentTime () {
  return dayjs.utc().format()
}
