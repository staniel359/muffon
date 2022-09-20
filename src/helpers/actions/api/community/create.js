import postRequest from '@/helpers/actions/api/request/post'
import {
  handleError as handleFormError
} from '@/helpers/actions/form'

export default function (
  {
    title,
    description,
    image
  }
) {
  const url = '/communities'

  const params = {
    title,
    description,
    image
  }

  const handleSuccess = (
    response
  ) => {
    this.communityId =
      response.data.community.id
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
      isWithSelfId: true,
      isWithSelfToken: true,
      onSuccess: handleSuccess,
      onError: handleError
    }
  )
}
