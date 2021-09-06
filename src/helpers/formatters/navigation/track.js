import i18n from '*/i18n'
import {
  main as formatArtistMainLink,
  tracks as formatArtistTracksLink
} from '#/formatters/links/artist'
import { main as formatTrackMainLink } from '#/formatters/links/track'

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
        name: i18n.global.t(
          `layout.navigation.${pageNameKey}`
        ),
        isActive: true
      }
    }
  }

  return [
    {
      name: i18n.global.t(
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
      name: i18n.global.t(
        'layout.navigation.tracks'
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
