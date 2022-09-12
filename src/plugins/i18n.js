import {
  createI18n
} from 'vue-i18n'
import electronStore from '*/plugins/electronStore'
import {
  formatLocales
} from '*/../shared/locales'
import russianPluralizationRule
  from '*/helpers/data/plugins/i18n/rules/pluralization/ru'

const locale =
  electronStore.get(
    'profile.language'
  )

function importLocaleFile (
  {
    code
  }
) {
  return require(
    `*/../shared/locales/${code}.json`
  )
}

const messages =
  formatLocales(
    {
      importLocaleFile
    }
  )

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
