import store from '*/plugins/store'
import patchRequest from '*/helpers/actions/api/request/patch'
import {
  handleError as handleFormError
} from '*/helpers/actions/form'

export default function (
  {
    email,
    password,
    passwordConfirmation,
    nickname,
    image,
    gender,
    birthdate,
    country,
    city,
    isPrivate
  }
) {
  this.profileData = null

  const profileId =
    store.getters['profile/id']

  const url = `/profiles/${profileId}`

  const params = {
    email,
    ...(password && {
      password
    }),
    ...(passwordConfirmation && {
      password_confirmation:
        passwordConfirmation
    }),
    nickname,
    image,
    gender,
    birthdate,
    country,
    city,
    private: (
      isPrivate ? 1 : 0
    )
  }

  const handleSuccess = (
    response
  ) => {
    this.profileData =
      response.data.profile
  }

  const handleError = (
    error
  ) => {
    handleFormError.bind(
      this
    )(
      {
        error
      }
    )
  }

  return patchRequest.bind(
    this
  )(
    {
      url,
      params,
      isWithSelfToken: true,
      onSuccess: handleSuccess,
      onError: handleError
    }
  )
}
