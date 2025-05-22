import i18n from 'i18n'
import getSettingsKey from '../actions/settings/getKey.js'
import be from './i18n/locales/be.json' with { type: 'json' }
import de from './i18n/locales/de.json' with { type: 'json' }
import en from './i18n/locales/en.json' with { type: 'json' }
import es from './i18n/locales/es.json' with { type: 'json' }
import fr from './i18n/locales/fr.json' with { type: 'json' }
import he from './i18n/locales/he.json' with { type: 'json' }
import it from './i18n/locales/it.json' with { type: 'json' }
import ja from './i18n/locales/ja.json' with { type: 'json' }
import ko from './i18n/locales/ko.json' with { type: 'json' }
import pl from './i18n/locales/pl.json' with { type: 'json' }
import ru from './i18n/locales/ru.json' with { type: 'json' }
import zh from './i18n/locales/zh.json' with { type: 'json' }
import genz from './i18n/locales/genz.json' with { type: 'json' }

// i18n

const locale =
  getSettingsKey(
    'profile.language'
  )

const localesData = {
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
  ru,
  zh,
  genz
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
