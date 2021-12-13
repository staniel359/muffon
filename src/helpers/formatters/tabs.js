import i18n from '&/i18n'

export const feed = () => {
  const title = i18n.global.t(
    'layout.navigation.feed'
  )

  return {
    title,
    path: 'feed',
    icon: 'list'
  }
}
