import getRequest from '@/helpers/actions/api/request/get'

export default function (
  {
    source = 'lastfm',
    scope = '',
    query,
    page,
    limit,
    isWithSelfData = false
  }
) {
  const url = `/${source}/search/${scope}`

  const params = {
    query
  }

  const handleSuccess = (
    response
  ) => {
    this.searchData =
      response.data.search
  }

  return getRequest.bind(
    this
  )(
    {
      url,
      params,
      isWithSelfToken: true,
      isWithSelfId: isWithSelfData,
      page,
      limit,
      onSuccess: handleSuccess
    }
  )
}
