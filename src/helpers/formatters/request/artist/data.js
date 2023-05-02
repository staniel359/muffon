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
    albumType:
      artistData.albumType
  }
}
