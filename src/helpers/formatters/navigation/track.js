import {
  artistMain as formatArtistMainLink,
  artistTracks as formatArtistTracksLink,
  trackMain as formatTrackMainLink
} from '#/formatters/links'
import { localize } from '#/actions/plugins/i18n'

export function navigation ({
  artistName = '...',
  trackTitle = '...',
  pageNameKey
}) {
  const artistsPageName = localize(
    'layout.navigation.artists'
  )

  const artistMainLink = formatArtistMainLink({
    artistName
  })

  const artistTracksPageName = localize(
    'layout.navigation.artist.tracks'
  )
  const artistTracksLink = formatArtistTracksLink({
    artistName
  })

  const formatLink = () => {
    if (pageNameKey) {
      return formatTrackMainLink({
        artistName, trackTitle
      })
    }
  }

  const formatSubpageSection = () => {
    if (pageNameKey) {
      const trackPageName = localize(
        `layout.navigation.track.${pageNameKey}`
      )

      return {
        name: trackPageName,
        isActive: true
      }
    }
  }

  return [
    { name: artistsPageName },
    {
      name: artistName,
      link: artistMainLink
    },
    {
      name: artistTracksPageName,
      link: artistTracksLink
    },
    {
      name: trackTitle,
      isActive: !pageNameKey,
      link: formatLink()
    },
    formatSubpageSection()
  ].filter(e => e)
}
