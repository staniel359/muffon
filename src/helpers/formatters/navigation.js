import i18n from '&/i18n'

export const startPage = () => {
  const startPageName = i18n.global.t(
    'layout.navigation.start'
  )

  return [
    {
      name: startPageName,
      isActive: true
    }
  ]
}
