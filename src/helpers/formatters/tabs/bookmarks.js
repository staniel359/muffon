import { bookmarks as formatBookmarksLink } from '#/formatters/links'
import { localize } from '#/actions/plugins/i18n'

export default function () {
  const title = localize(
    'layout.navigation.bookmarks'
  )

  const formatPath = () => {
    return formatBookmarksLink().path
  }

  return {
    icon: 'bookmark',
    title,
    path: formatPath()
  }
}
