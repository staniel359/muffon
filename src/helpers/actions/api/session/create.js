import postRequest from '*/helpers/actions/api/request/post'
import {
  handleError as handleFormError
} from '*/helpers/actions/form'

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

  const handleSuccess = (
    response
  ) => {
    const {
      token
    } = response.data.profile

    const profileId =
      response.data.profile.id

    this.token = token
    this.profileId = profileId
    this.isRemember = isRemember
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
      onSuccess: handleSuccess,
      onError: handleError
    }
  )
}
