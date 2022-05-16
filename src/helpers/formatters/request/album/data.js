export default function (
  {
    albumData,
    artistName
  }
) {
  const source = (
    albumData.source?.name ||
      'lastfm'
  )

  function formatAlbumData () {
    switch (source) {
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
          albumId: albumData.source.id,
          paramsData: {
            owner_id:
              albumData.source.owner_id,
            access_key:
              albumData.source.access_key
          }
        }
      case 'odnoklassniki':
        return {
          albumId: albumData.source.id
        }
      case 'yandexmusic':
        return {
          albumId: albumData.source.id
        }
      case 'deezer':
        return {
          albumId: albumData.source.id
        }
      case 'bandcamp':
        return {
          albumId: albumData.source.id,
          artistId: albumData.source.artist_id,
          album: albumData.source.slug,
          artist: albumData.source.artist_slug,
          model: albumData.source.model,
          paramsData: {
            album_type: albumData.source.model
          }
        }
      case 'soundcloud':
        return {
          albumId: albumData.source.id
        }
      case 'discogs':
        return {
          albumId: albumData.source.id,
          albumType: albumData.source.model
        }
      case 'spotify':
        return {
          albumId: albumData.source.id
        }
      case 'genius':
        return {
          albumId: albumData.source.id
        }
      case 'rateyourmusic':
        return {
          albumId: encodeURIComponent(
            albumData.source.slug
          )
        }
      default:
        return {}
    }
  }

  return {
    source,
    ...formatAlbumData()
  }
}
