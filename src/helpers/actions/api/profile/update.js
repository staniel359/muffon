import profileStore from '@/stores/profile'
import patchRequest from '@/helpers/actions/api/request/patch'
import {
  handleError as handleFormError
} from '@/helpers/actions/form'

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
    status,
    isPrivate,
    isSaveActivityHistory
  }
) {
  const profileId = profileStore().id

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
    status,
    private: (
      isPrivate ? 1 : 0
    ),
    save_activity_history: (
      isSaveActivityHistory ? 1 : 0
    )
  }

  function handleSuccess (
    response
  ) {
    return response.data
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

    throw error
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
