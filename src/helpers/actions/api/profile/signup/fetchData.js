import axios from 'axios'
import { camelCase } from 'camel-case'
import i18n from '*/i18n'
import local from '#/plugins/local'
import { addFormFieldError } from '#/actions/plugins/semantic'
import fetchProfileData from '../fetchData'

export default function ({
  email,
  password,
  passwordConfirmation,
  nickname,
  image,
  gender,
  birthdate,
  country,
  city,
  isRemember
}) {
  this.isLoading = true

  const url = '/profiles'
  const params = {
    email,
    password,
    password_confirmation: passwordConfirmation,
    nickname,
    image,
    gender,
    birthdate,
    country,
    city
  }

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
    const isBadRequest =
      error.response?.status === 403

    if (isBadRequest) {
      const { errors } = error.response.data

      const fields = [
        'email',
        'password',
        'password_confirmation',
        'nickname'
      ]

      const addError = errorData => {
        const addFieldError = field => {
          if (errorData[field]) {
            const errorFormatted = camelCase(
              errorData[field]
            )
            const fieldFormatted = camelCase(field)

            const error = i18n.global.t(
              'shared.profile.form.errors' +
              `.${errorFormatted}` +
              `.${fieldFormatted}`
            )

            addFormFieldError(
              this.form,
              fieldFormatted,
              error
            )
          }
        }

        fields.forEach(addFieldError)
      }

      errors.forEach(addError)
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
