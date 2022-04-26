import patchRequest from '*/helpers/actions/api/request/patch'
import {
  handleError as handleFormError
} from '*/helpers/actions/form'

export default function (
  {
    communityId,
    title,
    description,
    image
  }
) {
  this.communityData = null

  const url = `/communities/${communityId}`

  const params = {
    title,
    description,
    image
  }

  const handleSuccess = (
    response
  ) => {
    this.communityData =
      response.data.community
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
      isWithSelfId: true,
      isWithSelfToken: true,
      onSuccess: handleSuccess,
      onError: handleError
    }
  )
}
