export default function (
  {
    source,
    artistName,
    artistId,
    scope
  }
) {
  function formatArtistId () {
    if (source === 'lastfm') {
      return encodeURIComponent(
        artistName
      )
    } else {
      return artistId
    }
  }

  return `/${source}/artists/${formatArtistId()}/${scope}`
}
