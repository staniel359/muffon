export default function (
  {
    sourceId,
    artistName,
    artistId,
    scope
  }
) {
  function formatArtistId () {
    if (sourceId === 'lastfm') {
      return encodeURIComponent(
        artistName
      )
    } else {
      return artistId
    }
  }

  return `/${sourceId}/artists/${formatArtistId()}/${scope}`
}
