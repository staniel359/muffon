import i18n from '&/i18n'

export const feed = () => {
  const feedPageName = i18n.global.t(
    'layout.navigation.feed'
  )

  return [
    {
      name: feedPageName,
      isActive: true
    }
  ]
}
