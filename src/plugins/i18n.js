import {
  createI18n
} from 'vue-i18n'
import electronStore from '*/plugins/electronStore'
import {
  formatLocales
} from '*/helpers/actions/locales'
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
    `*/helpers/data/plugins/i18n/locales/${code}.json`
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
