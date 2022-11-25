export default function (
  {
    artistData
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
    ...formatArtistData(),
    albumType:
      artistData.albumType
  }
}
