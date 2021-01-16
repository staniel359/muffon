export default function requestData () {
  const { album, sourceId, typeId } = this.props

  const albumData = () => {
    switch (sourceId) {
      case 'lastfm':
        return {
          artist: album.artist,
          title: album.title
        }
      case 'vk':
        return {
          id: album.vk_id,
          ownerId: album.vk_owner_id,
          accessHash: album.vk_access_hash
        }
      case 'bandcamp':
        return { link: album.link }
      case 'soundcloud':
        return { id: album.soundcloud_id }
      case 'discogs':
        return { id: album.discogs_id }
    }
  }

  const typeIdData = typeId && { typeId }

  return { sourceId, ...typeIdData, ...albumData() }
}
