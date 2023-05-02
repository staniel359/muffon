export default function (
  {
    source,
    artistName,
    trackTitle,
    artistId,
    trackId,
    scope = ''
  }
) {
  const artistNameEncoded =
    encodeURIComponent(
      artistName
    )
  const trackTitleEncoded =
    encodeURIComponent(
      trackTitle
    )

  switch (source) {
    case 'lastfm':
      return (
        `/${source}/artists/${artistNameEncoded}` +
        `/tracks/${trackTitleEncoded}/${scope}`
      )
    case 'bandcamp':
      return `/${source}/artists/${artistId}/tracks/${trackId}/${scope}`
    default:
      return `/${source}/tracks/${trackId}/${scope}`
  }
}
