import i18n from '*/plugins/i18n'

export function home () {
  const title = i18n.global.t(
    'navigation.home'
  )

  return {
    title,
    path: 'home',
    icon: 'home'
  }
}

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
