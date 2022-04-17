import getRequest from '*/helpers/actions/api/request/get'

export default function (
  {
    channelId,
    scope = '',
    page,
    limit
  }
) {
  const url =
    `/youtube/channels/${channelId}/${scope}`

  const handleSuccess = (
    response
  ) => {
    this.channelData = {
      page: 1,
      total_pages: 1,
      ...response.data.channel
    }
  }

  return getRequest.bind(
    this
  )(
    {
      url,
      page,
      limit,
      onSuccess: handleSuccess
    }
  )
}
