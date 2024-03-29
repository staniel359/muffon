import i18n from '@/plugins/i18n'
import {
  main as formatTrackLink,
  similar as formatTrackSimilarLink,
  albums as formatTrackAlbumsLink,
  lyrics as formatTrackLyricsLink
} from '@/helpers/formatters/links/track'

export default function (
  {
    artistName,
    trackTitle,
    sourceParams,
    scope
  }
) {
  function formatTrackPageTitle () {
    if (scope) {
      return i18n.global.t(
        `navigation.model.${scope}`,
        {
          modelName: trackTitle
        }
      )
    } else {
      return trackTitle
    }
  }

  const artistPageTitle =
    i18n.global.t(
      'navigation.model.tracks',
      {
        modelName: artistName
      }
    )

  const title = [
    formatTrackPageTitle(),
    artistPageTitle
  ].join(
    ' | '
  )

  function formatLink () {
    switch (scope) {
      case 'similar':
        return formatTrackSimilarLink(
          {
            artistName,
            trackTitle
          }
        )
      case 'albums':
        return formatTrackAlbumsLink(
          {
            artistName,
            trackTitle,
            sourceParams
          }
        )
      case 'lyrics':
        return formatTrackLyricsLink(
          {
            artistName,
            trackTitle,
            sourceParams
          }
        )
      default:
        return formatTrackLink(
          {
            artistName,
            trackTitle,
            sourceParams
          }
        )
    }
  }

  const link = formatLink()

  return {
    icon: 'track',
    title,
    link,
    path: link.path
  }
}
