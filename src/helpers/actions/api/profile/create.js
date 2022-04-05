import axios from 'axios'
import electronStore from '*/plugins/electronStore'
import getProfile from '*/helpers/actions/api/profile/get'
import { addFormErrors } from '*/helpers/actions'

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
  this.error = null
  this.isLoading = true

  const url = '/profiles'
  const params = {
    email,
    password,
    password_confirmation:
      passwordConfirmation,
    nickname,
    image,
    gender,
    birthdate,
    country,
    city
  }

  const handleSuccess = response => {
    const { token } =
      response.data.profile

    electronStore.set({
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
    const isBadRequest =
      error.response?.status === 403

    if (isBadRequest) {
      const fields = [
        'email',
        'password',
        'password_confirmation',
        'nickname'
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
