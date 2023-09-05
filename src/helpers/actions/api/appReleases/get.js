import getRequest from '@/helpers/actions/api/request/get'

export default function (
  {
    page,
    limit
  }
) {
  const url = '/github/releases'

  const handleSuccess = (
    response
  ) => {
    this.releasesData = response.data
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
      onSuccess: handleSuccess
    }
  )
}
