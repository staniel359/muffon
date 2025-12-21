import profileStore from '@/stores/profile'
import getRequest from '@/helpers/actions/api/request/get'

export default function (
  {
    playlistId,
    source,
    scope = '',
    page,
    limit
  }
) {
  const profileId = profileStore().id

  const url =
    `/${source}/users/${profileId}/playlists/${playlistId}/${scope}`

  const handleSuccess = (
    response
  ) => {
    this.userData = response.data.user
  }

  return getRequest.bind(
    this
  )(
    {
      url,
      page,
      limit,
      isWithSelfToken: true,
      onSuccess: handleSuccess
    }
  )
}
