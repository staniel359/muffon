import formatArtistsSection
  from '*/helpers/formatters/navigation/sections/artists'
import formatArtistSection
  from '*/helpers/formatters/navigation/sections/artist'
import formatArtistTracksSection
  from '*/helpers/formatters/navigation/sections/artist/tracks'
import formatTrackSection
  from '*/helpers/formatters/navigation/sections/track'
import formatSubpageSection
  from '*/helpers/formatters/navigation/sections/subpage'

export default function ({
  artistName,
  trackTitle,
  sourceParams,
  scope
}) {
  return [
    formatArtistsSection(),
    formatArtistSection({
      artistName
    }),
    formatArtistTracksSection({
      artistName
    }),
    formatTrackSection({
      artistName,
      trackTitle,
      sourceParams,
      isActive: !scope
    }),
    scope && formatSubpageSection({
      scope
    })
  ].filter(e => e)
}
