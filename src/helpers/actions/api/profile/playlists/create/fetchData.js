import axios from 'axios'
import { camelCase } from 'camel-case'
import i18n from '&/i18n'
import store from '&/store'
import { addFormFieldError } from '#/actions/plugins/semantic'

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
      const { errors } = error.response.data

      const fields = [
        'title'
      ]

      const addError = errorData => {
        const addFieldError = field => {
          if (errorData[field]) {
            const errorKey = camelCase(
              errorData[field]
            )
            const fieldKey = camelCase(
              field
            )

            const error = i18n.global.t(
              'shared.playlist.form.errors' +
              `.${errorKey}.${fieldKey}`
            )

            addFormFieldError(
              this.form,
              fieldKey,
              error
            )
          }
        }

        fields.forEach(
          addFieldError
        )
      }

      errors.forEach(
        addError
      )
    } else {
      this.error = error
    }
  }

  const handleFinish = () => {
    this.isLoading = false
  }

  axios
    .post(url, params)
    .then(handleSuccess)
    .catch(handleError)
    .finally(handleFinish)
}
