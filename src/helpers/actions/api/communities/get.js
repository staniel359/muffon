import getRequest from '@/helpers/actions/api/request/get'

export default function (
  {
    page,
    limit
  }
) {
  const url = '/communities'

  const handleSuccess = (
    response
  ) => {
    this.communitiesData =
      response.data.communities
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
