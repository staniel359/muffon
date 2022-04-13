export default function (
  {
    sourceId,
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

  function formatScope () {
    if (albumType === 'albumVarious') {
      return 'albums'
    } else {
      return `${albumType}s`
    }
  }

  const albumScope = formatScope()

  function formatUrlData () {
    switch (sourceId) {
      case 'lastfm':
        return (
          `artists/${artistNameEncoded}` +
          `/${albumScope}/${albumTitleEncoded}/${scope}`
        )
      case 'bandcamp':
        return (
          `artists/${artistId}` +
          `/${albumScope}/${albumId}/${scope}`
        )
      default:
        return `${albumScope}/${albumId}/${scope}`
    }
  }

  return `/${sourceId}/${formatUrlData()}`
}
