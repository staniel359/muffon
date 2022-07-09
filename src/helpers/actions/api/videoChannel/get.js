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
    this.channelData =
      response.data.channel
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
