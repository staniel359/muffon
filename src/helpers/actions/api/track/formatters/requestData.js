export default function ({ sourceId, trackData }) {
  const formatTrackData = () => {
    switch (sourceId) {
      case 'lastfm':
        return {
          artistName: trackData.artist.name,
          trackTitle: trackData.title
        }
      case 'vk':
        return {
          trackId: trackData.vk_id
        }
      case 'odnoklassniki':
        return {
          trackId: trackData.odnoklassniki_id
        }
      case 'yandexmusic':
        return {
          trackId: trackData.yandex_music_id
        }
      case 'deezer':
        return {
          trackId: trackData.deezer_id
        }
      case 'bandcamp':
        return {
          artistName: trackData.artists[0].bandcamp_slug,
          title: trackData.bandcamp_slug
        }
      case 'soundcloud':
        return {
          trackId: trackData.soundcloud_id
        }
      case 'discogs':
        return {
          trackId: trackData.discogs_id
        }
      case 'spotify':
        return {
          trackId: trackData.spotify_id
        }
      case 'genius':
        return {
          trackId: trackData.genius_id
        }
      case 'rateyourmusic':
        return {
          trackId: encodeURIComponent(
            trackData.rateyourmusic_slug
          )
        }
      default:
        return {}
    }
  }

  return {
    sourceId,
    ...formatTrackData()
  }
}
