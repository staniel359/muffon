import countries from 'i18n-iso-countries'
import en from 'i18n-iso-countries/langs/en.json'
import ru from 'i18n-iso-countries/langs/ru.json'

const locales = [
  en,
  ru
]

function registerLocale (
  locale
) {
  countries.registerLocale(
    locale
  )
}

export default function () {
  locales.forEach(
    registerLocale
  )
}
