import getRequest from '*/helpers/actions/api/request/get'

export default function (
  {
    profileId,
    libraryTrackId,
    scope = '',
    page,
    limit
  }
) {
  const url =
    `/profiles/${profileId}/library` +
    `/tracks/${libraryTrackId}/${scope}`

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
