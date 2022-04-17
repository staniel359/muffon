import store from '*/plugins/store'
import getRequest from '*/helpers/actions/api/request/get'

export default function (
  {
    communityId,
    scope = '',
    page,
    limit
  }
) {
  const url =
    `/communities/${communityId}/${scope}`

  const profileId =
    store.state.profile.info.id

  const params = {
    profile_id: profileId
  }

  const handleSuccess = (
    response
  ) => {
    this.communityData =
      response.data.community
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
