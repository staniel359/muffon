const locales = [
  {
    id: 'be',
    name: 'Беларуская'
  },
  {
    id: 'en',
    name: 'English'
  },
  {
    id: 'de',
    name: 'Deutsch'
  },
  {
    id: 'it',
    name: 'Italiano'
  },
  {
    id: 'ru',
    name: 'Русский'
  }
]

function formatLocales (
  {
    importLocaleFile
  }
) {
  function formatLocale (
    {
      id
    }
  ) {
    const locale =
      importLocaleFile(
        {
          id
        }
      )

    return [
      id,
      locale
    ]
  }

  const localesFormatted =
    locales.map(
      formatLocale
    )

  return Object.fromEntries(
    localesFormatted
  )
}

module.exports = {
  locales,
  formatLocales
}
