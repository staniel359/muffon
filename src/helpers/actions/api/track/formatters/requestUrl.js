export default function ({
  sourceId,
  artistName,
  trackTitle,
  artistId,
  trackId,
  scope
}) {
  const artistNameEncoded = encodeURIComponent(artistName)
  const trackTitleEncoded = encodeURIComponent(trackTitle)

  switch (sourceId) {
    case 'lastfm':
      return (
        `/${sourceId}` +
        `/artists/${artistNameEncoded}` +
        `/tracks/${trackTitleEncoded}` +
        `/${scope}`
      )
    case 'bandcamp':
      return `/${sourceId}/artists/${artistId}/tracks/${trackId}`
    case 'genius':
      return `/${sourceId}/tracks/${trackId}/${scope}`
    default:
      return `/${sourceId}/tracks/${trackId}`
  }
}
