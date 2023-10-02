import {
  registerLocale
} from 'i18n-iso-countries'
import be from 'i18n-iso-countries/langs/be.json'
import de from 'i18n-iso-countries/langs/de.json'
import en from 'i18n-iso-countries/langs/en.json'
import fr from 'i18n-iso-countries/langs/fr.json'
import he from 'i18n-iso-countries/langs/he.json'
import it from 'i18n-iso-countries/langs/it.json'
import ja from 'i18n-iso-countries/langs/ja.json'
import ru from 'i18n-iso-countries/langs/ru.json'

// i18n

const locales = [
  be,
  de,
  en,
  fr,
  he,
  it,
  ja,
  ru
]

function addLocale (
  locale
) {
  registerLocale(
    locale
  )
}

export default function () {
  locales.forEach(
    addLocale
  )
}
