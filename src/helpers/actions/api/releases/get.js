import getRequest from '@/helpers/actions/api/request/get'

export default function (
  {
    scope,
    page,
    limit
  }
) {
  const url = `/lastfm/releases/${scope}`

  const handleSuccess = (
    response
  ) => {
    this.releasesData =
      response.data.releases
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
