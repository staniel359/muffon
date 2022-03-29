import i18n from '*/plugins/i18n'
import {
  main as formatTrackMainLink,
  similar as formatTrackSimilarLink
} from '*/helpers/formatters/links/track'

export default function ({
  artistName,
  trackTitle,
  sourceParams,
  pageNameKey
}) {
  const formatTrackPageTitle = () => {
    if (pageNameKey) {
      return i18n.global.t(
        `navigation.model.${pageNameKey}`,
        { modelName: trackTitle }
      )
    } else {
      return trackTitle
    }
  }

  const artistPageTitle = i18n.global.t(
    'navigation.model.tracks',
    { modelName: artistName }
  )

  const title = [
    formatTrackPageTitle(),
    artistPageTitle
  ].join(' | ')

  const formatPath = () => {
    switch (pageNameKey) {
      case 'similar':
        return formatTrackSimilarLink({
          artistName,
          trackTitle
        }).path
      default:
        return formatTrackMainLink({
          artistName,
          trackTitle,
          sourceParams
        }).path
    }
  }

  return {
    icon: 'music',
    title,
    path: formatPath()
  }
}
