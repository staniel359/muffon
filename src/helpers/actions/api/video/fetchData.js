import axios from 'axios'

export default function ({ videoId, scope = '' }) {
  this.isLoading = true

  const url = `/youtube/videos/${videoId}/${scope}`
  const params = {}

  const handleSuccess = response => {
    this.error = null
    this.videoData = response.data.video
  }

  const handleError = error => {
    this.error = error
  }

  const handleFinish = () => {
    this.isLoading = false
  }

  return axios
    .get(url, { params })
    .then(handleSuccess)
    .catch(handleError)
    .finally(handleFinish)
}
