import store from '*/plugins/store'
import getRequest from '*/helpers/actions/api/request/get'

export default function (
  {
    page,
    limit
  }
) {
  const profileId =
    store.state.profile.info.id

  const url =
    `/profiles/${profileId}/conversations`

  const {
    token
  } = store.state.profile

  const params = {
    token
  }

  const handleSuccess = (
    response
  ) => {
    this.conversationsData =
      response.data.profile
  }

  return getRequest.bind(
    this
  )(
    {
      url,
      params,
      page,
      limit,
      onSuccess: handleSuccess
    }
  )
}
