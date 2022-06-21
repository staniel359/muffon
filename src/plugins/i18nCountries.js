import countries from 'i18n-iso-countries'
import locales from '*/helpers/data/locales'

function registerLocale (
  {
    code
  }
) {
  const importLocaleFile = require(
    `i18n-iso-countries/langs/${code}.json`
  )

  countries.registerLocale(
    importLocaleFile
  )
}

export default function () {
  locales.forEach(
    registerLocale
  )
}
