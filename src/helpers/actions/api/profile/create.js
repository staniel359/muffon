import postRequest from '@/helpers/actions/api/request/post'
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
    isRemember
  }
) {
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
    city,
    status,
    private: (
      isPrivate ? 1 : 0
    )
  }

  function handleSuccess (
    response
  ) {
    return {
      ...response.data,
      isRemember
    }
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

  return postRequest.bind(
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
