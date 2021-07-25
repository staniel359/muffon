import axios from 'axios'
import { camelCase } from 'camel-case'
import local from '#/plugins/local'
import { setGlobalData } from '#/actions'
import { localize } from '#/actions/plugins/i18n'
import { addFormFieldError } from '#/actions/plugins/semantic'
import fetchProfileInfo from '../info/fetchData'

export default function ({
  email,
  password,
  passwordConfirmation,
  nickname,
  avatar,
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
    avatar,
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

    setGlobalData({
      'profile.isLoggedIn': true
    })

    const profileId = response.data.profile.id

    return fetchProfileInfo.bind(this)({
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
    .post(url, params)
    .then(handleSuccess)
    .catch(handleError)
    .finally(handleFinish)
}
