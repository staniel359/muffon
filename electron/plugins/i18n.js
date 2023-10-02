import i18n from 'i18n'
import getElectronStoreKey from '#/actions/electronStore/getKey'
import be from './i18n/locales/be.json'
import de from './i18n/locales/de.json'
import en from './i18n/locales/en.json'
import fr from './i18n/locales/fr.json'
import he from './i18n/locales/he.json'
import it from './i18n/locales/it.json'
import ja from './i18n/locales/ja.json'
import ru from './i18n/locales/ru.json'

// i18n

const locale =
  getElectronStoreKey(
    'profile.language'
  )

const localesData = {
  be,
  de,
  en,
  fr,
  he,
  it,
  ja,
  ru
}

const options = {
  defaultLocale: locale,
  staticCatalog: localesData,
  objectNotation: true
}

export default function () {
  i18n.configure(
    options
  )
}
