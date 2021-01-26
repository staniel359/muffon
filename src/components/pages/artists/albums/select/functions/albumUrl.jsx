export default function albumUrl ({ album, dataName }) {
  const baseUrl = () => {
    switch (album.sourceId) {
      case 'lastfm':
        return `/${album.sourceId}/artists/${album.artist.name}/albums/${album.title}`
      case 'vk':
        return (
          `/${album.sourceId}/albums/${album.id}` +
          `?owner_id=${album.ownerId}` +
          `&access_hash=${album.accessHash}`
        )
      case 'bandcamp':
        return `/${album.sourceId}/albums/${encodeURIComponent(album.link)}`
      case 'soundcloud':
        return `/${album.sourceId}/albums/${album.id}`
      case 'discogs':
        return `/${album.sourceId}/${album.typeId}/${album.id}`
      case 'spotify':
        return `/${album.sourceId}/albums/${album.id}`
      case 'deezer':
        return `/${album.sourceId}/albums/${album.id}`
    }
  }

  if (dataName && dataName !== 'album') {
    return `${baseUrl()}/${dataName}`
  } else {
    return baseUrl()
  }
}
