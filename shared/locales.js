const locales = [
  {
    code: 'en',
    text: 'English'
  },
  {
    code: 'it',
    text: 'Italiano'
  },
  {
    code: 'ru',
    text: 'Русский'
  }
]

function formatLocales (
  {
    importLocaleFile
  }
) {
  function formatLocale (
    {
      code
    }
  ) {
    const locale =
      importLocaleFile(
        {
          code
        }
      )

    return [
      code,
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
