import i18n from '@/plugins/i18n'
import {
  main as formatBookmarksMainLink
} from '@/helpers/formatters/links/bookmarks'

export default function (
  {
    isActive
  }
) {
  function formatLink () {
    if (!isActive) {
      return formatBookmarksMainLink()
    }
  }

  return {
    name: i18n.global.t(
      'navigation.bookmarks'
    ),
    isActive,
    link: formatLink()
  }
}
