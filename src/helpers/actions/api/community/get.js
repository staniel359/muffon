import getRequest from '*/helpers/actions/api/request/get'

export default function (
  {
    communityId,
    scope = '',
    page,
    limit
  }
) {
  const url =
    `/communities/${communityId}/${scope}`

  const handleSuccess = (
    response
  ) => {
    this.communityData =
      response.data.community
  }

  return getRequest.bind(
    this
  )(
    {
      url,
      isWithSelfId: true,
      page,
      limit,
      onSuccess: handleSuccess
    }
  )
}
