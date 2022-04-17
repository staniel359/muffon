import store from '*/plugins/store'
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

  const profileId =
    store.state.profile.info.id

  const {
    token
  } = store.state.profile

  const params = {
    profile_id: profileId,
    token,
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
      onSuccess: handleSuccess,
      onError: handleError
    }
  )
}
