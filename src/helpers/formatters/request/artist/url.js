export default function (
  {
    source,
    artistName,
    artistId,
    artistSlug,
    scope
  }
) {
  const artistNameEncoded =
    encodeURIComponent(
      artistName
    )

  function formatUrlData () {
    switch (source) {
      case 'lastfm':
        return `artists/${artistNameEncoded}/${scope}`
      case 'musixmatch':
        return `artists/${artistSlug}/${scope}`
      default:
        return `artists/${artistId}/${scope}`
    }
  }

  return `/${source}/${formatUrlData()}`
}
