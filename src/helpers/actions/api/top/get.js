import getRequest from '@/helpers/actions/api/request/get'

export default function (
  {
    scope,
    country,
    page,
    limit
  }
) {
  const url = `/lastfm/top/${scope}`

  const params = {
    ...(country && {
      country
    })
  }

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
      params,
      isWithSelfId: true,
      isWithSelfToken: true,
      page,
      limit,
      onSuccess: handleSuccess
    }
  )
}
