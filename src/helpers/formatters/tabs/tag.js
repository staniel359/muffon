import i18n from '@/plugins/i18n'
import {
  main as formatTagMainLink,
  artists as formatTagArtistsLink,
  albums as formatTagAlbumsLink,
  tracks as formatTagTracksLink
} from '@/helpers/formatters/links/tag'

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

  const title = formatTitle()

  function formatLink () {
    switch (scope) {
      case 'artists':
        return formatTagArtistsLink(
          {
            tagName
          }
        )
      case 'albums':
        return formatTagAlbumsLink(
          {
            tagName
          }
        )
      case 'tracks':
        return formatTagTracksLink(
          {
            tagName
          }
        )
      default:
        return formatTagMainLink(
          {
            tagName
          }
        )
    }
  }

  const link = formatLink()

  return {
    icon: 'tag',
    title,
    link,
    path: link.path
  }
}
