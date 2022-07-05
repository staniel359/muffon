export default function (
  {
    trackData,
    artistName
  }
) {
  const source = (
    trackData.source?.name ||
      'lastfm'
  )

  function formatTrackData () {
    switch (source) {
      case 'lastfm':
        return {
          artistName: (
            trackData.artist?.name ||
              trackData.artistName ||
              artistName
          ),
          trackTitle: (
            trackData.title ||
              trackData.trackTitle
          )
        }
      case 'vk':
        return {
          trackId: trackData.source.id
        }
      case 'odnoklassniki':
        return {
          trackId: trackData.source.id
        }
      case 'yandexmusic':
        return {
          trackId: trackData.source.id
        }
      case 'deezer':
        return {
          trackId: trackData.source.id
        }
      case 'bandcamp':
        return {
          trackId: trackData.source.id,
          artistId: trackData.source.artist_id,
          slug: trackData.source.slug,
          artistSlug: trackData.source.artist_slug
        }
      case 'soundcloud':
        return {
          trackId: trackData.source.id
        }
      case 'discogs':
        return {
          trackId: trackData.source.id
        }
      case 'spotify':
        return {
          trackId: trackData.source.id
        }
      case 'genius':
        return {
          trackId: trackData.source.id
        }
      case 'rateyourmusic':
        return {
          trackId: encodeURIComponent(
            trackData.source.slug
          )
        }
      default:
        return {}
    }
  }

  return {
    source,
    ...formatTrackData()
  }
}
