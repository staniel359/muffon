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
              artistName
          ),
          trackTitle: trackData.title
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
          track: trackData.source.slug,
          artist: trackData.source.artist_slug
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
