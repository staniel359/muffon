import countries from 'i18n-iso-countries'
import be from 'i18n-iso-countries/langs/be.json'
import de from 'i18n-iso-countries/langs/de.json'
import en from 'i18n-iso-countries/langs/en.json'
import it from 'i18n-iso-countries/langs/it.json'
import ru from 'i18n-iso-countries/langs/ru.json'

// i18n

const locales = [
  be,
  de,
  en,
  it,
  ru
]

function addLocale (
  locale
) {
  countries.registerLocale(
    locale
  )
}

export default function () {
  locales.forEach(
    addLocale
  )
}
