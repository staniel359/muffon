import getRequest from '*/helpers/actions/api/request/get'

export default function (
  {
    scope,
    page,
    limit
  }
) {
  const url = `/lastfm/top/${scope}`

  const handleSuccess = (
    response
  ) => {
    this.topData =
      response.data.top
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
