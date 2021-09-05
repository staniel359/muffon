import { localize } from '#/actions/plugins/i18n'

export default function () {
  return [
    {
      name: localize(
        'layout.navigation.bookmarks'
      ),
      isActive: true
    }
  ]
}
