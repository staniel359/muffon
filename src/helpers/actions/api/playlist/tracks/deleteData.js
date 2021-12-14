import axios from 'axios'
import store from '&/store'

export default function ({
  playlistId,
  playlistTrackId
}) {
  this.isError = false
  this.isLoading = true

  const profileId =
    store.state.profile.info.id
  const url =
    `/profiles/${profileId}` +
    `/playlists/${playlistId}` +
    `/tracks/${playlistTrackId}`

  const { token } = store.state.profile
  const params = {
    token
  }

  const handleSuccess = response => {
    this.playlistTrackId = null
    this.isSuccess = true
  }

  const handleError = error => {
    this.isError = true

    throw error
  }

  const handleFinish = () => {
    this.isLoading = false
  }

  return axios
    .delete(url, { params })
    .then(handleSuccess)
    .catch(handleError)
    .finally(handleFinish)
}
