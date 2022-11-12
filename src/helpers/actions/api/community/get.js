import getRequest from '@/helpers/actions/api/request/get'

export default function (
  {
    communityId,
    scope = '',
    page,
    limit,
    order
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
      isWithSelfToken: true,
      page,
      limit,
      order,
      onSuccess: handleSuccess
    }
  )
}
