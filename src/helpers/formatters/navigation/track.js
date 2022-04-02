import i18n from '*/plugins/i18n'
import {
  main as formatArtistMainLink,
  tracks as formatArtistTracksLink
} from '*/helpers/formatters/links/artist'
import { main as formatTrackMainLink } from '*/helpers/formatters/links/track'

export default function ({
  artistName,
  trackTitle,
  sourceParams,
  scope
}) {
  const formatLink = () => {
    if (scope) {
      return formatTrackMainLink({
        artistName,
        trackTitle,
        sourceParams
      })
    }
  }

  const formatSubpageSection = () => {
    if (scope) {
      return {
        name: i18n.global.t(
          `navigation.${scope}`
        ),
        isActive: true
      }
    }
  }

  return [
    {
      name: i18n.global.t(
        'navigation.artists'
      )
    },
    {
      name: artistName,
      link: formatArtistMainLink({
        artistName
      })
    },
    {
      name: i18n.global.t(
        'navigation.tracks'
      ),
      link: formatArtistTracksLink({
        artistName
      })
    },
    {
      name: trackTitle,
      isActive: !scope,
      link: formatLink()
    },
    formatSubpageSection()
  ].filter(e => e)
}
