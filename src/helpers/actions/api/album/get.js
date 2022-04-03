import axios from 'axios'
import store from '*/plugins/store'
import formatAlbumRequestUrl from '*/helpers/formatters/request/album/url'

export default function ({
  sourceId = 'lastfm',
  artistName,
  albumTitle,
  artistId,
  albumId,
  albumType = 'album',
  paramsData,
  scope = '',
  page,
  limit
}) {
  this.error = null
  this.isLoading = true

  const url =
    formatAlbumRequestUrl({
      sourceId,
      artistName,
      albumTitle,
      artistId,
      albumId,
      albumType,
      scope
    })

  const profileId =
    store.state.profile.info.id
  const lang =
    store.state.profile.language

  const params = {
    ...paramsData,
    profile_id: profileId,
    lang,
    ...(page && { page }),
    ...(limit && { limit })
  }

  const handleSuccess = response => {
    const formatAlbumType = () => {
      if (albumType === 'albumVarious') {
        return 'album'
      } else {
        return albumType
      }
    }

    this.albumData = response.data[
      formatAlbumType()
    ]
  }

  const handleError = error => {
    this.error = error
  }

  const handleFinish = () => {
    this.isLoading = false
  }

  return axios.get(
    url, { params }
  ).then(
    handleSuccess
  ).catch(
    handleError
  ).finally(
    handleFinish
  )
}
