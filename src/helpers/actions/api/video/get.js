import axios from 'axios'

export default function ({ videoId, scope = '' }) {
  this.error = null
  this.isLoading = true

  const url =
    `/youtube/videos/${videoId}/${scope}`

  const handleSuccess = response => {
    this.videoData =
      response.data.video
  }

  const handleError = error => {
    this.error = error
  }

  const handleFinish = () => {
    this.isLoading = false
  }

  return axios.get(
    url
  ).then(
    handleSuccess
  ).catch(
    handleError
  ).finally(
    handleFinish
  )
}
