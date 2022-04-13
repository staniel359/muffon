import i18n from '*/plugins/i18n'
import {
  main as formatTagMainLink,
  artists as formatTagArtistsLink,
  albums as formatTagAlbumsLink,
  tracks as formatTagTracksLink
} from '*/helpers/formatters/links/tag'

export default function (
  {
    tagName,
    scope
  }
) {
  function formatTitle () {
    if (scope) {
      return i18n.global.t(
        `navigation.model.${scope}`,
        {
          modelName: tagName
        }
      )
    } else {
      return tagName
    }
  }

  function formatPath () {
    switch (scope) {
      case 'artists':
        return formatTagArtistsLink(
          {
            tagName
          }
        ).path
      case 'albums':
        return formatTagAlbumsLink(
          {
            tagName
          }
        ).path
      case 'tracks':
        return formatTagTracksLink(
          {
            tagName
          }
        ).path
      default:
        return formatTagMainLink(
          {
            tagName
          }
        ).path
    }
  }

  return {
    icon: 'tag',
    title: formatTitle(),
    path: formatPath()
  }
}
