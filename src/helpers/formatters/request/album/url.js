export default function (
  {
    source,
    artistName,
    albumTitle,
    artistId,
    albumId,
    albumType = 'album',
    scope
  }
) {
  const artistNameEncoded =
    encodeURIComponent(
      artistName
    )
  const albumTitleEncoded =
    encodeURIComponent(
      albumTitle
    )

  const albumScope = `${albumType}s`

  function formatUrlData () {
    switch (source) {
      case 'lastfm':
        return (
          `artists/${artistNameEncoded}` +
          `/${albumScope}/${albumTitleEncoded}/${scope}`
        )
      case 'bandcamp':
        return (
          `artists/${artistId}/${albumScope}/${albumId}/${scope}`
        )
      default:
        return `${albumScope}/${albumId}/${scope}`
    }
  }

  return `/${source}/${formatUrlData()}`
}
