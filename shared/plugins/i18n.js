import {
  createI18n
} from 'vue-i18n'
import electronStore from './electronStore.js'
import locales from '../helpers/data/i18n/locales.js'
import belarusianRussianPluralizationRule
  from './i18n/rules/pluralization/beRu.js'

const locale =
  electronStore.get(
    'profile.language'
  )

async function importLocale (
  localeData
) {
  const {
    id
  } = localeData

  const importPath =
    `../helpers/data/i18n/locales/${id}.json`

  const importData = {
    assert: {
      type: 'json'
    }
  }

  function handleImport (
    result
  ) {
    return [
      id,
      result.default
    ]
  }

  return import(
    importPath,
    importData
  ).then(
    handleImport
  )
}

const localesImported =
  locales.map(
    importLocale
  )

const localesFormatted =
  await Promise.all(
    localesImported
  )

const messages =
  Object.fromEntries(
    localesFormatted
  )

const pluralizationRules = {
  be: belarusianRussianPluralizationRule,
  ru: belarusianRussianPluralizationRule
}

export default createI18n(
  {
    fallbackLocale: 'en',
    locale,
    messages,
    pluralizationRules
  }
)
