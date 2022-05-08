import getRequest from '*/helpers/actions/api/request/get'

export default function (
  {
    profileId,
    libraryTagId,
    scope = '',
    page,
    limit
  }
) {
  const url =
    `/profiles/${profileId}/library` +
    `/tags/${libraryTagId}/${scope}`

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
