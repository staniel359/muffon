import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc.js'

export default function () {
  dayjs.extend(
    utc
  )
}
