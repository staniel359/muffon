import axios from 'axios'
import store from '&/store'
import { addFormErrors } from '#/actions'

export default function ({ playlistId, title, image }) {
  this.error = null
  this.isLoading = true

  const profileId =
    store.state.profile.info.id
  const url =
    `/profiles/${profileId}/playlists/${playlistId}`

  const { token } = store.state.profile
  const params = {
    token,
    title,
    image
  }

  const handleSuccess = response => {
    this.setProfileData(
      response.data.profile
    )

    this.$emit(
      'success'
    )
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
        form: this.form
      })
    } else {
      this.error = error
    }
  }

  const handleFinish = () => {
    this.isLoading = false
  }

  axios.patch(
    url, params
  ).then(
    handleSuccess
  ).catch(
    handleError
  ).finally(
    handleFinish
  )
}
