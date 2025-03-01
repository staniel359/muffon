import postRequest from '@/helpers/actions/api/request/post'
import {
  handleError as handleFormError
} from '@/helpers/actions/form'

export default function (
  {
    email,
    password,
    isRemember
  }
) {
  const url = '/sessions'

  const params = {
    email,
    password
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
