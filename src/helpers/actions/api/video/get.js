import getRequest from '@/helpers/actions/api/request/get'

export default function (
  {
    videoId,
    scope = '',
    page,
    limit
  }
) {
  const url =
    `/youtube/videos/${videoId}/${scope}`

  const handleSuccess = (
    response
  ) => {
    const videoData =
      response.data.video

    this.videoData = videoData

    return videoData
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
