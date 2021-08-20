import {
  main as formatArtistMainLink,
  tracks as formatArtistTracksLink
} from '#/formatters/links/artist'
import { main as formatTrackMainLink } from '#/formatters/links/track'
import { localize } from '#/actions/plugins/i18n'

export default function ({ artistName, trackTitle, pageNameKey }) {
  const formatLink = () => {
    if (pageNameKey) {
      return formatTrackMainLink({
        artistName, trackTitle
      })
    }
  }

  const formatSubpageSection = () => {
    if (pageNameKey) {
      return {
        name: localize(
          `layout.navigation.track.${pageNameKey}`
        ),
        isActive: true
      }
    }
  }

  return [
    {
      name: localize(
        'layout.navigation.artists'
      )
    },
    {
      name: artistName,
      link: formatArtistMainLink({
        artistName
      })
    },
    {
      name: localize(
        'layout.navigation.artist.tracks'
      ),
      link: formatArtistTracksLink({
        artistName
      })
    },
    {
      name: trackTitle,
      isActive: !pageNameKey,
      link: formatLink()
    },
    formatSubpageSection()
  ].filter(e => e)
}
