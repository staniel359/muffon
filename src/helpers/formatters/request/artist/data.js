export default function (
  {
    artistData
  }
) {
  const source = (
    artistData.source?.name ||
      'lastfm'
  )

  function formatArtistData () {
    switch (source) {
      case 'lastfm':
        return {
          artistName: artistData.name
        }
      case 'vk':
        return {
          artistId: artistData.source.id
        }
      case 'odnoklassniki':
        return {
          artistId: artistData.source.id
        }
      case 'yandexmusic':
        return {
          artistId: artistData.source.id
        }
      case 'deezer':
        return {
          artistId: artistData.source.id
        }
      case 'bandcamp':
        return {
          artistId: artistData.source.id
        }
      case 'soundcloud':
        return {
          artistId: artistData.source.id
        }
      case 'discogs':
        return {
          artistId: artistData.source.id
        }
      case 'spotify':
        return {
          artistId: artistData.source.id
        }
      case 'genius':
        return {
          artistId: artistData.source.id
        }
      default:
        return {}
    }
  }

  return {
    source,
    ...formatArtistData(),
    albumType:
      artistData.albumType
  }
}
