export default function albumRequestData ({ album }) {
  const { selectedSourceId, selectedTypeId } = this.props

  const albumData = () => {
    switch (selectedSourceId) {
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
      case 'deezer':
        return { id: album.deezer_id }
    }
  }

  const selectedTypeIdData = selectedTypeId && { typeId: selectedTypeId }

  return {
    sourceId: selectedSourceId,
    ...selectedTypeIdData,
    ...albumData()
  }
}
