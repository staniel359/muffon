import getRequest from '@/helpers/actions/api/request/get'

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
    const channelData =
      response.data.channel

    this.channelData = channelData

    return channelData
  }

  return getRequest.bind(
    this
  )(
    {
      url,
      page,
      limit,
      isWithSelfId: true,
      isWithSelfToken: true,
      onSuccess: handleSuccess
    }
  )
}
