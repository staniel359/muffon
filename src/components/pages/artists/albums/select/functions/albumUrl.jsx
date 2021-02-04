export default function albumUrl ({ album, dataName }) {
  const baseUrl = () => {
    switch (album.sourceId) {
      case 'lastfm':
        return `/lastfm/artists/${album.artist.name}/albums/${album.title}`
      case 'vk':
        return (
          `/vk/albums/${album.id}` +
          `?owner_id=${album.ownerId}` +
          `&access_hash=${album.accessHash}`
        )
      case 'bandcamp':
        return `/bandcamp/albums/${encodeURIComponent(album.link)}`
      case 'soundcloud':
        return `/soundcloud/albums/${album.id}`
      case 'discogs':
        return `/discogs/${album.typeId}/${album.id}`
      case 'spotify':
        return `/spotify/albums/${album.id}`
      case 'deezer':
        return `/deezer/albums/${album.id}`
      case 'yandexMusic':
        return `/yandex/music/albums/${album.id}`
    }
  }

  if (dataName && dataName !== 'album') {
    return `${baseUrl()}/${dataName}`
  } else {
    return baseUrl()
  }
}
