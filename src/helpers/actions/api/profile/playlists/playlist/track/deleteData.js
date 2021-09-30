import axios from 'axios'
import store from '*/store'

export default function ({ playlistId, playlistTrackId }) {
  this.isLoading = true
  this.error = null

  const profileId =
    store.state.profile.info.id
  const url =
    `profiles/${profileId}` +
    `/playlists/${playlistId}` +
    `/tracks/${playlistTrackId}`

  const { token } = store.state.profile
  const params = { token }

  const handleSuccess = () => {
    this.$refs.modal.hide()

    this.$emit('deleted')
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
