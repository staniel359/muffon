const {
  createI18n
} = require(
  'vue-i18n'
)
const electronStore = require(
  './electronStore'
)
const {
  formatLocales
} = require(
  './i18n/locales'
)
const belarusianRussianPluralizationRule = require(
  './i18n/rules/pluralization/beRu'
)

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
    `./i18n/locales/${id}.json`
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

const i18n = createI18n(
  {
    fallbackLocale: 'en',
    locale,
    messages,
    pluralizationRules
  }
)

module.exports = i18n
