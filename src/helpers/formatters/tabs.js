import { localize } from '#/actions/plugins/i18n'

export const startPage = () => {
  const title = localize(
    'layout.navigation.start'
  )

  return {
    title,
    path: 'start'
  }
}
