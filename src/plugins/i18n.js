import {
  createI18n
} from 'vue-i18n'
import electronStore from '@/plugins/electronStore'
import {
  formatLocales
} from '@/../shared/locales'
import belarusianRussianPluralizationRule
  from '@/helpers/data/plugins/i18n/rules/pluralization/beRu'

const locale =
  electronStore.get(
    'profile.language'
  )

function importLocaleFile (
  {
    id
  }
) {
  return require(
    `@/../shared/locales/${id}.json`
  )
}

const messages =
  formatLocales(
    {
      importLocaleFile
    }
  )

const pluralizationRules = {
  be: belarusianRussianPluralizationRule,
  ru: belarusianRussianPluralizationRule
}

export default createI18n(
  {
    locale,
    fallbackLocale: 'en',
    messages,
    pluralizationRules
  }
)
