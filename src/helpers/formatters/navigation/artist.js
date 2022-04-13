import formatArtistsSection
  from '*/helpers/formatters/navigation/sections/artists'
import formatArtistSection
  from '*/helpers/formatters/navigation/sections/artist'
import formatSubpageSection
  from '*/helpers/formatters/navigation/sections/subpage'

export default function (
  {
    artistName,
    scope
  }
) {
  return [
    formatArtistsSection(),
    formatArtistSection(
      {
        artistName,
        isActive: !scope
      }
    ),
    scope && formatSubpageSection(
      {
        scope
      }
    )
  ].filter(
    e => e
  )
}
