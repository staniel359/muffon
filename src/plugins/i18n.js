import {
  createI18n
} from 'vue-i18n'
import be from './i18n/locales/be.json'
import de from './i18n/locales/de.json'
import en from './i18n/locales/en.json'
import fr from './i18n/locales/fr.json'
import he from './i18n/locales/he.json'
import it from './i18n/locales/it.json'
import ja from './i18n/locales/ja.json'
import ru from './i18n/locales/ru.json'
import belarusianRussianPluralizationRule
  from './i18n/rules/pluralization/beRu.js'

// i18n

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

if (import.meta.hot) {
  import.meta.hot.accept(
    './i18n/locales/be.json',
    fileImport => {
      i18n.global.setLocaleMessage(
        'be',
        fileImport.default
      )
    }
  )

  import.meta.hot.accept(
    './i18n/locales/de.json',
    fileImport => {
      i18n.global.setLocaleMessage(
        'de',
        fileImport.default
      )
    }
  )

  import.meta.hot.accept(
    './i18n/locales/en.json',
    fileImport => {
      i18n.global.setLocaleMessage(
        'en',
        fileImport.default
      )
    }
  )

  import.meta.hot.accept(
    './i18n/locales/fr.json',
    fileImport => {
      i18n.global.setLocaleMessage(
        'fr',
        fileImport.default
      )
    }
  )

  import.meta.hot.accept(
    './i18n/locales/he.json',
    fileImport => {
      i18n.global.setLocaleMessage(
        'he',
        fileImport.default
      )
    }
  )

  import.meta.hot.accept(
    './i18n/locales/it.json',
    fileImport => {
      i18n.global.setLocaleMessage(
        'it',
        fileImport.default
      )
    }
  )

  import.meta.hot.accept(
    './i18n/locales/ja.json',
    fileImport => {
      i18n.global.setLocaleMessage(
        'ja',
        fileImport.default
      )
    }
  )

  import.meta.hot.accept(
    './i18n/locales/ru.json',
    fileImport => {
      i18n.global.setLocaleMessage(
        'ru',
        fileImport.default
      )
    }
  )
}

export default i18n
