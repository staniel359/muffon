import axios from 'axios'
import { camelCase } from 'camel-case'
import local from '#/plugins/local'
import { setGlobalData } from '#/actions'
import { localize } from '#/actions/plugins/i18n'
import { addFormFieldError } from '#/actions/plugins/semantic'

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
  this.isSuccess = false

  const profileId = local.get(
    'profile.info'
  ).id
  const token = local.get(
    'profile.token'
  )

  const url = `/profiles/${profileId}`
  const params = {
    token,
    email,
    ...(password && { password }),
    ...(passwordConfirmation && {
      password_confirmation:
        passwordConfirmation
    }),
    nickname,
    image,
    gender,
    birthdate,
    country,
    city
  }

  const handleSuccess = response => {
    const info = response.data.profile

    setGlobalData({
      'profile.info': info
    })

    this.isSuccess = true
    this.error = null
    this.image = null
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

            const error = localize(
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
    .patch(url, params)
    .then(handleSuccess)
    .catch(handleError)
    .finally(handleFinish)
}
