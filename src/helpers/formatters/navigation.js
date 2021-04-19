import { localize } from '#/actions/plugins/i18n'

export function homePage () {
  const homePageName = localize(
    'layout.navigation.home'
  )

  return [
    { name: homePageName }
  ]
}
