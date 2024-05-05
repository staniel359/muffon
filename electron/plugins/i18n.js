import i18n from 'i18n'
import getElectronStoreKey from '../actions/electronStore/getKey.js'
import be from './i18n/locales/be.json' assert { type: 'json' }
import de from './i18n/locales/de.json' assert { type: 'json' }
import en from './i18n/locales/en.json' assert { type: 'json' }
import fr from './i18n/locales/fr.json' assert { type: 'json' }
import he from './i18n/locales/he.json' assert { type: 'json' }
import it from './i18n/locales/it.json' assert { type: 'json' }
import ja from './i18n/locales/ja.json' assert { type: 'json' }
import ru from './i18n/locales/ru.json' assert { type: 'json' }

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
