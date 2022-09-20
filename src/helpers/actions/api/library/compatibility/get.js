import store from '@/plugins/store'
import getRequest from '@/helpers/actions/api/request/get'

export default function (
  {
    otherProfileId,
    scope = '',
    page,
    limit
  }
) {
  const profileId =
    store.getters['profile/id']

  const url =
    `/profiles/${profileId}/library` +
    `/compatibility/${scope}`

  const params = {
    other_profile_id: otherProfileId
  }

  const handleSuccess = (
    response
  ) => {
    this.compatibilityData =
      response.data.compatibility
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
