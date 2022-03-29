import axios from 'axios'
import store from '*/plugins/store'
import { updateStore, addFormErrors } from '*/helpers/actions'

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
  this.isSuccess = false

  const profileId =
    store.state.profile.info.id
  const url = `/profiles/${profileId}`

  const { token } = store.state.profile
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

    updateStore({
      'profile.info': info
    })

    this.isSuccess = true
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
