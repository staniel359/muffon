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

  const url = `/profiles/${profileId}/feed`

  const handleSuccess = (
    response
  ) => {
    this.feedData =
      response.data.profile
  }

  return getRequest.bind(
    this
  )(
    {
      url,
      page,
      limit,
      onSuccess: handleSuccess
    }
  )
}
