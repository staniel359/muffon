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
              albumData.artistName ||
              artistName
          ),
          albumTitle: (
            albumData.title ||
              albumData.albumTitle
          )
        }
      case 'vk':
        return {
          albumId: albumData.source.id,
          ownerId:
            albumData.source.owner_id,
          accessKey:
            albumData.source.access_key
        }
      case 'bandcamp':
        return {
          albumId: albumData.source.id,
          artistId:
            albumData.source.artist_id,
          model: albumData.source.model
        }
      case 'discogs':
        return {
          albumId: albumData.source.id,
          albumType: (
            albumData.source.model ||
              albumData.source.album_type
          )
        }
      default:
        return {
          albumId: albumData.source.id
        }
    }
  }

  return {
    source,
    ...formatAlbumData()
  }
}
