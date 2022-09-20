import countries from 'i18n-iso-countries'
import {
  locales
} from '@/../shared/locales'

function addLocale (
  {
    code
  }
) {
  const locale =
    require(
      `i18n-iso-countries/langs/${code}.json`
    )

  countries.registerLocale(
    locale
  )
}

export default function () {
  locales.forEach(
    addLocale
  )
}
