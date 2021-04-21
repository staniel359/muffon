export default function ({
  sourceId,
  artistName,
  trackTitle,
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
    case 'genius':
      return `/${sourceId}/tracks/${trackId}/${scope}`
  }
}
