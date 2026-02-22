export default function (
  {
    source,
    artistName,
    trackTitle,
    artistId,
    albumId,
    trackId,
    trackSlug,
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
    case 'amazonmusic':
      return `/${source}/tracks/${trackId}/${scope}?album_id=${albumId}`
    case 'bandcamp':
      return `/${source}/artists/${artistId}/tracks/${trackId}/${scope}`
    case 'lastfm':
      return (
        `/${source}/artists/${artistNameEncoded}` +
        `/tracks/${trackTitleEncoded}/${scope}`
      )
    case 'musixmatch':
      return `/${source}/tracks/${trackSlug}/${scope}`
    default:
      return `/${source}/tracks/${trackId}/${scope}`
  }
}
