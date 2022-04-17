import getRequest from '*/helpers/actions/api/request/get'

export default function (
  {
    profileId,
    artistId,
    scope = '',
    page,
    limit
  }
) {
  const url =
    `/profiles/${profileId}/library` +
    `/artists/${artistId}/${scope}`

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
