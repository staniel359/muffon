import axios from 'axios'
import local from '#/plugins/local'
import { localize } from '#/actions/plugins/i18n'
import { addFormFieldError } from '#/actions/plugins/semantic'
import fetchProfileData from '../fetchData'

export default function ({ email, password, isRemember }) {
  this.isLoading = true

  const url = '/sessions'
  const params = { email, password }

  const handleSuccess = response => {
    const { token } = response.data.profile

    local.set({
      'profile.token': token,
      'profile.isRemember': isRemember
    })

    const profileId = response.data.profile.id

    return fetchProfileData.bind(this)({
      profileId
    })
  }

  const handleError = error => {
    const isNotFound =
      error.response?.status === 404

    if (isNotFound) {
      const fields = ['email', 'password']
      const notFoundError = localize(
        'shared.profile.form.errors.notFound'
      )

      const addFieldError = field => {
        addFormFieldError(
          this.form,
          field,
          notFoundError
        )
      }

      fields.forEach(addFieldError)
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
