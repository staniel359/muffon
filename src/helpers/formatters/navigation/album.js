import formatArtistsSection
  from '*/helpers/formatters/navigation/sections/artists'
import formatArtistSection
  from '*/helpers/formatters/navigation/sections/artist'
import formatArtistAlbumsSection
  from '*/helpers/formatters/navigation/sections/artist/albums'
import formatAlbumSection
  from '*/helpers/formatters/navigation/sections/album'
import formatSubpageSection
  from '*/helpers/formatters/navigation/sections/subpage'

export default function ({
  artistName,
  albumTitle,
  sourceParams,
  scope
}) {
  return [
    formatArtistsSection(),
    formatArtistSection({
      artistName
    }),
    formatArtistAlbumsSection({
      artistName
    }),
    formatAlbumSection({
      artistName,
      albumTitle,
      sourceParams,
      isActive: !scope
    }),
    scope && formatSubpageSection({
      scope
    })
  ].filter(e => e)
}
