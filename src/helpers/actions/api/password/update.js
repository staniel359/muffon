import patchRequest from '@/helpers/actions/api/request/patch'
import {
  handleError as handleFormError
} from '@/helpers/actions/form'

export default function (
  {
    email,
    code,
    password,
    passwordConfirmation
  }
) {
  const url = '/passwords/update'

  const params = {
    email,
    code,
    password,
    password_confirmation:
      passwordConfirmation
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
      onError: handleError
    }
  )
}
