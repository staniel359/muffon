import axios from 'axios'

export default function (
  {
    videoId,
    scope = '',
    page,
    limit
  }
) {
  this.error = null
  this.isLoading = true

  const url =
    `/youtube/videos/${videoId}/${scope}`

  const params = {
    ...(page && {
      page
    }),
    ...(limit && {
      limit
    })
  }

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

  const handleError = (
    error
  ) => {
    this.error = error
  }

  const handleFinish = () => {
    this.isLoading = false
  }

  return axios.get(
    url,
    {
      params
    }
  ).then(
    handleSuccess
  ).catch(
    handleError
  ).finally(
    handleFinish
  )
}
