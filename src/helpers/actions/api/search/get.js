import getRequest from '*/helpers/actions/api/request/get'

export default function (
  {
    sourceId = 'lastfm',
    scope = '',
    query,
    page,
    limit,
    isWithSelfData = false
  }
) {
  const url = `/${sourceId}/search/${scope}`

  const params = {
    query
  }

  const handleSuccess = (
    response
  ) => {
    if (sourceId === 'youtube') {
      this.searchData = {
        page: 1,
        total_pages: 1,
        ...response.data.search
      }
    } else {
      this.searchData =
        response.data.search
    }
  }

  return getRequest.bind(
    this
  )(
    {
      url,
      params,
      isWithSelfId: isWithSelfData,
      page,
      limit,
      onSuccess: handleSuccess
    }
  )
}
