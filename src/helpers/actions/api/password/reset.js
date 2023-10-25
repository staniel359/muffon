import postRequest from '@/helpers/actions/api/request/post'
import {
  handleError as handleFormError
} from '@/helpers/actions/form'

export default function (
  {
    email
  }
) {
  const url = '/passwords/reset'

  const params = {
    email
  }

  const handleSuccess = () => {
    this.setEmail(
      email
    )
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

  return postRequest.bind(
    this
  )(
    {
      url,
      params,
      isWithSelfToken: true,
      isWithSelfLanguage: true,
      onSuccess: handleSuccess,
      onError: handleError
    }
  )
}
