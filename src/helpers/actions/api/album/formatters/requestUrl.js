export default function ({
  sourceId,
  artistName,
  albumTitle,
  artistId,
  albumId,
  albumType = 'album'
}) {
  const artistNameEncoded = encodeURIComponent(artistName)
  const albumTitleEncoded = encodeURIComponent(albumTitle)

  const formatScope = () => {
    if (albumType === 'albumVarious') {
      return 'albums'
    } else {
      return `${albumType}s`
    }
  }

  const scope = formatScope()

  const formatUrlData = () => {
    switch (sourceId) {
      case 'lastfm':
        return `artists/${artistNameEncoded}/${scope}/${albumTitleEncoded}`
      case 'bandcamp':
        return `artists/${artistId}/${scope}/${albumId}`
      default:
        return `${scope}/${albumId}`
    }
  }

  return `/${sourceId}/${formatUrlData()}`
}
