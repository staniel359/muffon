import {
  createI18n
} from 'vue-i18n'
import be from './i18n/locales/be.json'
import de from './i18n/locales/de.json'
import en from './i18n/locales/en.json'
import it from './i18n/locales/it.json'
import ru from './i18n/locales/ru.json'
import belarusianRussianPluralizationRule
  from './i18n/rules/pluralization/beRu.js'

// i18n

const localesData = {
  be,
  de,
  en,
  it,
  ru
}

const pluralizationRules = {
  be: belarusianRussianPluralizationRule,
  ru: belarusianRussianPluralizationRule
}

const i18n =
  createI18n(
    {
      fallbackLocale: 'en',
      messages: localesData,
      pluralizationRules
    }
  )

export default i18n
