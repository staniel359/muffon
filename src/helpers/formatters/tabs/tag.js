import {
  main as formatTagMainLink,
  artists as formatTagArtistsLink,
  albums as formatTagAlbumsLink,
  tracks as formatTagTracksLink
} from '#/formatters/links/tag'
import { localize } from '#/actions/plugins/i18n'

export default function ({ tagName, pageNameKey }) {
  const formatSubpageTitle = () => {
    if (pageNameKey) {
      return localize(
        `layout.navigation.${pageNameKey}`
      ).toLowerCase()
    }
  }

  const title = [
    tagName,
    formatSubpageTitle()
  ].filter(e => e).join(' ')

  const formatPath = () => {
    switch (pageNameKey) {
      case 'artists':
        return formatTagArtistsLink({
          tagName
        }).path
      case 'albums':
        return formatTagAlbumsLink({
          tagName
        }).path
      case 'tracks':
        return formatTagTracksLink({
          tagName
        }).path
      default:
        return formatTagMainLink({
          tagName
        }).path
    }
  }

  return {
    icon: 'tag',
    title,
    path: formatPath()
  }
}
