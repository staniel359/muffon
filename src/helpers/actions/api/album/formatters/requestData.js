export default function ({ sourceId, albumData, artistName }) {
  const formatAlbumData = () => {
    switch (sourceId) {
      case 'lastfm':
        return {
          artistName: (
            albumData.artist?.name ||
              artistName
          ),
          albumTitle: albumData.title
        }
      case 'vk':
        return {
          albumId: albumData.vk_id,
          paramsData: {
            owner_id: albumData.vk_owner_id,
            access_key: albumData.vk_access_key
          }
        }
      case 'odnoklassniki':
        return {
          albumId: albumData.odnoklassniki_id
        }
      case 'yandexmusic':
        return {
          albumId: albumData.yandex_music_id
        }
      case 'deezer':
        return {
          albumId: albumData.deezer_id
        }
      case 'bandcamp':
        return {
          artistName: albumData.artists[0].bandcamp_slug,
          albumTitle: albumData.bandcamp_slug,
          albumId: albumData.bandcamp_id,
          artistId: albumData.artists[0].bandcamp_id,
          model: albumData.bandcamp_model,
          paramsData: {
            album_type: albumData.bandcamp_model
          }
        }
      case 'soundcloud':
        return {
          albumId: albumData.soundcloud_id
        }
      case 'discogs':
        return {
          albumId: albumData.discogs_id
        }
      case 'spotify':
        return {
          albumId: albumData.spotify_id
        }
      case 'genius':
        return {
          albumId: albumData.genius_id
        }
      case 'rateyourmusic':
        return {
          albumId: encodeURIComponent(
            albumData.rateyourmusic_slug
          )
        }
      default:
        return {}
    }
  }

  return {
    sourceId,
    ...formatAlbumData()
  }
}
