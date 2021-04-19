export default function ({ sourceId, albumData }) {
  const formatAlbumData = () => {
    switch (sourceId) {
      case 'lastfm':
        return {
          artistName: albumData.artist.name,
          albumTitle: albumData.title
        }
      case 'vk':
        return {
          albumId: albumData.vk_id,
          paramsData: {
            owner_id: albumData.vk_owner_id,
            access_hash: albumData.vk_access_hash
          }
        }
      case 'odnoklassniki':
        return {
          albumId: albumData.odnoklassniki_id
        }
      case 'yandex-music':
        return {
          albumId: albumData.yandex_music_id
        }
      case 'deezer':
        return {
          albumId: albumData.deezer_id
        }
      case 'bandcamp':
        return {
          model: albumData.id_data.album_type,
          artistName: albumData.id_data.artist,
          title: albumData.id_data.title,
          paramsData: {
            album_type: albumData.id_data.album_type
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
      default:
        return {}
    }
  }

  return { sourceId, ...formatAlbumData() }
}
