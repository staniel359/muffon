import profileStore from '@/stores/profile'
import getRequest from '@/helpers/actions/api/request/get'

export default function (
  {
    otherProfileId,
    scope = '',
    page,
    limit
  }
) {
  const profileId = profileStore().id

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
      isWithSelfToken: true,
      onSuccess: handleSuccess
    }
  )
}
