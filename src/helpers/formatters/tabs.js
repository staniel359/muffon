import i18n from '*/plugins/i18n'

export function feed () {
  const title = i18n.global.t(
    'navigation.feed'
  )

  return {
    title,
    path: 'feed',
    icon: 'list'
  }
}
