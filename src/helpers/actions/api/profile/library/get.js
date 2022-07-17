import store from '*/plugins/store'
import getRequest from '*/helpers/actions/api/request/get'

export default function (
  {
    profileId,
    scope = '',
    page,
    limit
  }
) {
  const url =
    `/profiles/${profileId}/library/${scope}`

  const otherProfileId =
    store.getters['profile/id']

  const params = {
    other_profile_id: otherProfileId
  }

  const handleSuccess = (
    response
  ) => {
    this.profileData =
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
