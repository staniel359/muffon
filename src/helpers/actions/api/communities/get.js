import getRequest from '@/helpers/actions/api/request/get'

export default function (
  {
    page,
    limit,
    order
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
      isWithSelfToken: true,
      page,
      limit,
      order,
      onSuccess: handleSuccess
    }
  )
}
