import profileStore from '@/stores/profile'
import getRequest from '@/helpers/actions/api/request/get'

export default function (
  {
    profileId,
    libraryAlbumId,
    scope = '',
    page,
    limit,
    order
  }
) {
  const url =
    `/profiles/${profileId}/library` +
    `/albums/${libraryAlbumId}/${scope}`

  const otherProfileId = profileStore().id

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
