import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

export default function () {
  dayjs.extend(
    utc
  )
}
