import store from '*/plugins/store'
import getRequest from '*/helpers/actions/api/request/get'

export default function (
  {
    page,
    limit
  }
) {
  const url = '/communities'

  const profileId =
    store.state.profile.info.id

  const params = {
    profile_id: profileId
  }

  const handleSuccess = (
    response
  ) => {
    this.communitiesData =
      response.data.communities
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
