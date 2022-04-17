import getRequest from '*/helpers/actions/api/request/get'

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
    if (scope === 'related') {
      this.videoData = {
        page: 1,
        total_pages: 1,
        ...response.data.video
      }
    } else {
      this.videoData =
        response.data.video
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
