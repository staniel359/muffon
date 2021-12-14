import axios from 'axios'
import store from '&/store'

export default function ({ playlistId }) {
  this.error = null
  this.isLoading = true

  const profileId =
    store.state.profile.info.id
  const url =
    `profiles/${profileId}/playlists/${playlistId}`

  const { token } = store.state.profile
  const params = { token }

  const handleSuccess = () => {
    this.isSuccess = true
  }

  const handleError = error => {
    this.error = error
  }

  const handleFinish = () => {
    this.isLoading = false
  }

  axios
    .delete(url, { params })
    .then(handleSuccess)
    .catch(handleError)
    .finally(handleFinish)
}
