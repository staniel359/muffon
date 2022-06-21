import locales from '*/helpers/data/locales'

export function formatLocales (
  {
    importLocaleFile
  }
) {
  function formatLocale (
    {
      code
    }
  ) {
    const file = importLocaleFile(
      {
        code
      }
    )

    return [
      code,
      file
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
