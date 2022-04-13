import axios from 'axios'

export default function (
  {
    channelId,
    scope = '',
    page,
    limit
  }
) {
  this.error = null
  this.isLoading = true

  const url =
    `/youtube/channels/${channelId}/${scope}`

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
    this.channelData = {
      page: 1,
      total_pages: 1,
      ...response.data.channel
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
