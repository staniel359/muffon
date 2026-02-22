export default function (
  {
    albumData,
    artistName,
    scope
  }
) {
  const source = (
    albumData.source?.name ||
      'lastfm'
  )

  function formatAlbumData () {
    switch (source) {
      case 'bandcamp':
        return {
          albumId: albumData.source.id,
          artistId: albumData.source.artist_id,
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
      case 'musicbrainz':
        return {
          albumId: albumData.source.id,
          albumType: (
            albumData.source.model ||
              albumData.source.album_type
          )
        }
      case 'musixmatch':
        return {
          albumSlug: albumData.source.slug
        }
      case 'vk':
        return {
          albumId: albumData.source.id,
          ownerId: albumData.source.owner_id,
          accessKey: albumData.source.access_key
        }
      default:
        return {
          albumId: albumData.source.id
        }
    }
  }

  return {
    source,
    scope,
    ...formatAlbumData()
  }
}
