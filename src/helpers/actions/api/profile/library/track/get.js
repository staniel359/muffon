import store from '@/plugins/store'
import getRequest from '@/helpers/actions/api/request/get'

export default function (
  {
    profileId,
    libraryTrackId,
    scope = '',
    page,
    limit,
    order
  }
) {
  const url =
    `/profiles/${profileId}/library` +
    `/tracks/${libraryTrackId}/${scope}`

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
      isWithSelfToken: true,
      page,
      limit,
      order,
      onSuccess: handleSuccess
    }
  )
}
