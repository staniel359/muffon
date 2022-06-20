import {
  createI18n
} from 'vue-i18n'
import electronStore from '*/plugins/electronStore'
import en from '*/helpers/data/plugins/i18n/locales/en.json'
import ru from '*/helpers/data/plugins/i18n/locales/ru.json'
import russianPluralizationRule
  from '*/helpers/data/plugins/i18n/rules/pluralization/ru'

const locale =
  electronStore.get(
    'profile.language'
  )

const messages = {
  en,
  ru
}

const pluralizationRules = {
  ru: russianPluralizationRule
}

export default createI18n(
  {
    locale,
    fallbackLocale: 'en',
    messages,
    pluralizationRules
  }
)
