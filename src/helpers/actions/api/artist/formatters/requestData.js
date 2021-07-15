export default function ({ sourceId, artistData, albumType = '' }) {
  const formatArtistData = () => {
    switch (sourceId) {
      case 'lastfm':
        return {
          artistName: artistData.name
        }
      case 'vk':
        return {
          artistId: artistData.vk_slug
        }
      case 'odnoklassniki':
        return {
          artistId: artistData.odnoklassniki_id
        }
      case 'yandexmusic':
        return {
          artistId: artistData.yandex_music_id
        }
      case 'deezer':
        return {
          artistId: artistData.deezer_id
        }
      case 'bandcamp':
        return {
          artistName: artistData.bandcamp_slug
        }
      case 'soundcloud':
        return {
          artistId: artistData.soundcloud_id
        }
      case 'discogs':
        return {
          artistId: artistData.discogs_id
        }
      case 'spotify':
        return {
          artistId: artistData.spotify_id
        }
      case 'genius':
        return {
          artistId: artistData.genius_id
        }
      case 'rateyourmusic':
        return {
          artistId: artistData.rateyourmusic_id
        }
      default:
        return {}
    }
  }

  return {
    sourceId,
    ...formatArtistData(),
    albumType
  }
}
