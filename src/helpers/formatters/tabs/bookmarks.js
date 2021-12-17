import i18n from '&/i18n'
import { bookmarks as formatBookmarksLink } from '#/formatters/links'

export default function () {
  const title = i18n.global.t(
    'navigation.bookmarks'
  )

  const { path } = formatBookmarksLink()

  return {
    icon: 'bookmark',
    title,
    path
  }
}
