const i18n = require(
  'i18n'
)
const electronStore = require(
  '../../electronStore'
)
const en = require(
  '../../data/locales/en.json'
)
const ru = require(
  '../../data/locales/ru.json'
)

const defaultLocale =
  electronStore.get(
    'profile.language',
    'en'
  )

const i18nData = {
  locales: [
    'en',
    'ru'
  ],
  defaultLocale,
  staticCatalog: {
    en,
    ru
  },
  mustacheConfig: {
    tags: [
      '{',
      '}'
    ]
  },
  objectNotation: true
}

function setup () {
  i18n.configure(
    i18nData
  )
}

module.exports = setup
