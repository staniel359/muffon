import getRequest from '*/helpers/actions/api/request/get'

export default function (
  {
    profileId,
    playlistId,
    scope = '',
    page,
    limit
  }
) {
  const url =
    `/profiles/${profileId}/playlists/${playlistId}/${scope}`

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
      page,
      limit,
      onSuccess: handleSuccess
    }
  )
}
