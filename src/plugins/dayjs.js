import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import localeData from 'dayjs/plugin/localeData'
import 'dayjs/locale/be'
import 'dayjs/locale/de'
import 'dayjs/locale/es'
import 'dayjs/locale/fr'
import 'dayjs/locale/he'
import 'dayjs/locale/it'
import 'dayjs/locale/ja'
import 'dayjs/locale/ko'
import 'dayjs/locale/pl'
import 'dayjs/locale/pt-br'
import 'dayjs/locale/ru'
import 'dayjs/locale/zh'

// i18n

export default function () {
  dayjs.extend(
    duration
  )

  dayjs.extend(
    utc
  )

  dayjs.extend(
    timezone
  )

  dayjs.extend(
    localizedFormat
  )

  dayjs.extend(
    localeData
  )
}
