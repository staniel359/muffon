import axios from 'axios'
import i18n from '*/plugins/i18n'
import { updateStore } from '*/helpers/actions'
import { addFormFieldError } from '*/helpers/actions/plugins/semantic'
import getProfile from '*/helpers/actions/api/profile/get'

export default function ({ email, password, isRemember }) {
  this.error = null
  this.isLoading = true

  const url = '/sessions'
  const params = { email, password }

  const handleSuccess = response => {
    const { token } = response.data.profile

    updateStore({
      'profile.token': token,
      'profile.isRemember': isRemember
    })

    const profileId =
      response.data.profile.id

    return getProfile.bind(this)({
      profileId,
      token
    })
  }

  const handleError = error => {
    const isNotFound =
      error.response?.status === 404

    if (isNotFound) {
      const fields = [
        'email',
        'password'
      ]
      const notFoundError = i18n.global.t(
        'forms.errors.notFound'
      )

      const addFieldError = field => {
        addFormFieldError(
          this.form,
          field,
          notFoundError
        )
      }

      fields.forEach(
        addFieldError
      )
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
