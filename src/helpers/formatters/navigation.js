import { localize } from '#/actions/plugins/i18n'

export const startPage = () => {
  const startPageName = localize(
    'layout.navigation.start'
  )

  return [
    { name: startPageName }
  ]
}
