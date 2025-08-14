import {
  registerLocale
} from 'i18n-iso-countries'
import be from 'i18n-iso-countries/langs/be.json'
import de from 'i18n-iso-countries/langs/de.json'
import en from 'i18n-iso-countries/langs/en.json'
import es from 'i18n-iso-countries/langs/es.json'
import fr from 'i18n-iso-countries/langs/fr.json'
import he from 'i18n-iso-countries/langs/he.json'
import it from 'i18n-iso-countries/langs/it.json'
import ja from 'i18n-iso-countries/langs/ja.json'
import ko from 'i18n-iso-countries/langs/ko.json'
import pl from 'i18n-iso-countries/langs/pl.json'
import ptBr from './i18nCountries/locales/pt_BR.json'
import ru from 'i18n-iso-countries/langs/ru.json'
import zh from 'i18n-iso-countries/langs/zh.json'

// i18n

const locales = [
  be,
  de,
  en,
  es,
  fr,
  he,
  it,
  ja,
  ko,
  pl,
  ptBr,
  ru,
  zh
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
