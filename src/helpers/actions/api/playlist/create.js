import axios from 'axios'
import store from '&/store'
import { addFormErrors } from '#/actions'

export default function ({ title, image }) {
  this.error = null
  this.isLoading = true

  const profileId =
    store.state.profile.info.id
  const url =
    `/profiles/${profileId}/playlists`

  const { token } = store.state.profile
  const params = {
    token,
    title,
    image
  }

  const handleSuccess = response => {
    this.playlistId =
      response.data.playlist_id
  }

  const handleError = error => {
    const isBadRequest =
      error.response?.status === 403

    if (isBadRequest) {
      const fields = [
        'title'
      ]

      addFormErrors({
        error,
        fields,
        form: this.form,
        formKey: 'playlist'
      })
    } else {
      this.error = error
    }
  }

  const handleFinish = () => {
    this.isLoading = false
  }

  axios.post(
    url, params
  ).then(
    handleSuccess
  ).catch(
    handleError
  ).finally(
    handleFinish
  )
}
