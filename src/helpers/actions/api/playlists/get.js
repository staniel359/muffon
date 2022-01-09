import axios from 'axios'

export default function ({ page, limit }) {
  this.error = null
  this.isLoading = true

  const url = '/playlists'

  const params = {
    ...(page && { page }),
    ...(limit && { limit })
  }

  const handleSuccess = response => {
    this.playlistsData =
      response.data.playlists
  }

  const handleError = error => {
    this.error = error
  }

  const handleFinish = () => {
    this.isLoading = false
  }

  axios.get(
    url, { params }
  ).then(
    handleSuccess
  ).catch(
    handleError
  ).finally(
    handleFinish
  )
}
