import i18n from '&/i18n'
import {
  main as formatTagMainLink,
  artists as formatTagArtistsLink,
  albums as formatTagAlbumsLink,
  tracks as formatTagTracksLink
} from '#/formatters/links/tag'

export default function ({ tagName, pageNameKey }) {
  const formatTitle = () => {
    if (pageNameKey) {
      return i18n.global.t(
        `navigation.model.${pageNameKey}`,
        { modelName: tagName }
      )
    } else {
      return tagName
    }
  }

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
    title: formatTitle(),
    path: formatPath()
  }
}
