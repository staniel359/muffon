import dayjs from 'dayjs'
import i18n from '@/plugins/i18n'
import locales from '@/helpers/data/locales'
import {
  update as updateGlobalStore
} from '@/helpers/actions/store/global'

export function change (
  value
) {
  i18n.global.locale = value

  const isMatchedLocale = (
    localeData
  ) => {
    return (
      localeData.id === value
    )
  }

  const locale =
    locales.find(
      isMatchedLocale
    )

  const direction = (
    locale.rtl ? 'rtl' : 'ltr'
  )

  document.lang = value
  document.dir = direction

  updateGlobalStore(
    {
      'layout.isRtl': !!locale.rtl
    }
  )

  dayjs.locale(
    value
  )
}
