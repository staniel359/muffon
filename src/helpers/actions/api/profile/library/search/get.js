import profileStore from '@/stores/profile'
import getRequest from '@/helpers/actions/api/request/get'

export default function (
  {
    query,
    profileId,
    scope = '',
    page,
    limit,
    order
  }
) {
  const url =
    `/profiles/${profileId}/library/search/${scope}`

  const otherProfileId = profileStore().id

  const params = {
    other_profile_id: otherProfileId,
    query
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
      isWithSelfToken: true,
      page,
      limit,
      order,
      onSuccess: handleSuccess
    }
  )
}
