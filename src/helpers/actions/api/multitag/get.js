import getRequest from '*/helpers/actions/api/request/get'

export default function (
  {
    tags,
    scope,
    page,
    limit
  }
) {
  const url = `/lastfm/multitag/${scope}`

  const params = {
    tags
  }

  const handleSuccess = (
    response
  ) => {
    this.multitagData =
      response.data.multitag
  }

  return getRequest.bind(
    this
  )(
    {
      url,
      params,
      isWithSelfId: true,
      page,
      limit,
      onSuccess: handleSuccess
    }
  )
}
