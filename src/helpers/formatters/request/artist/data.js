export default function (
  {
    artistData,
    scope
  }
) {
  const source = (
    artistData.source?.name ||
      'lastfm'
  )

  function formatArtistData () {
    switch (source) {
      case 'lastfm':
        return {
          artistName: artistData.name
        }
      case 'musixmatch':
        return {
          artistSlug: artistData.source.slug
        }
      default:
        return {
          artistId: artistData.source.id
        }
    }
  }

  return {
    source,
    scope,
    ...formatArtistData(),
    albumsType: artistData.albumsType
  }
}
