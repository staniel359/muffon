import store from '*/plugins/store'
import getRequest from '*/helpers/actions/api/request/get'

export default function (
  {
    scope,
    page,
    limit
  }
) {
  const url = `/lastfm/top/${scope}`

  const profileId =
    store.state.profile.info.id

  const params = {
    profile_id: profileId
  }

  const handleSuccess = (
    response
  ) => {
    this.topData =
      response.data.top
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
