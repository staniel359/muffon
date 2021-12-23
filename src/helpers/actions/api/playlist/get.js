import axios from 'axios'

export default function ({ profileId, playlistId, scope = '', page, limit }) {
  this.error = null
  this.isLoading = true

  const url =
    `/profiles/${profileId}/playlists/${playlistId}/${scope}`

  const params = {
    ...(page && { page }),
    ...(limit && { limit })
  }

  const handleSuccess = response => {
    this.profileData = response.data.profile
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
