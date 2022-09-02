import getRequest from '*/helpers/actions/api/request/get'

export default function (
  {
    query,
    profileId,
    scope = '',
    page,
    limit
  }
) {
  const url =
    `/profiles/${profileId}/library/search/${scope}`

  const params = {
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
      onSuccess: handleSuccess
    }
  )
}
