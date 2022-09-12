const i18n = require(
  'i18n'
)
const electronStore = require(
  '../../electronStore'
)
const {
  locales,
  formatLocales
} = require(
  '../../../shared/locales'
)

const defaultLocale =
  electronStore.get(
    'profile.language',
    'en'
  )

function importLocaleFile (
  {
    code
  }
) {
  return require(
    `../../../shared/locales/${code}.json`
  )
}

const localesData =
  formatLocales(
    {
      importLocaleFile
    }
  )

const i18nData = {
  locales,
  defaultLocale,
  staticCatalog: localesData,
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
