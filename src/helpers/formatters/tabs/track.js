import {
  main as formatTrackMainLink,
  similar as formatTrackSimilarLink
} from '#/formatters/links/track'
import { localize } from '#/actions/plugins/i18n'

export default function ({ artistName, trackTitle, pageNameKey }) {
  const formatSubpageTitle = () => {
    if (pageNameKey) {
      return localize(
        `layout.navigation.track.${pageNameKey}`
      ).toLowerCase()
    }
  }

  const trackPageTitle = [
    trackTitle,
    formatSubpageTitle()
  ].filter(e => e).join(' ')

  const artistTracksPageName = localize(
    'layout.navigation.artist.tracks'
  ).toLowerCase()
  const artistPageTitle =
    `${artistName} ${artistTracksPageName}`

  const title = [
    trackPageTitle,
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
          trackTitle
        }).path
    }
  }

  return {
    icon: 'music',
    title,
    path: formatPath()
  }
}
