import axios from 'axios'

export default function ({ profileId, trackId, page, limit }) {
  this.isLoading = true

  const url = `/profiles/${profileId}/playlists`

  const params = {
    track_id: trackId,
    ...(page && { page }),
    ...(limit && { limit })
  }

  const handleSuccess = response => {
    this.error = null
    this.profileData = response.data.profile
  }

  const handleError = error => {
    this.error = error
  }

  const handleFinish = () => {
    this.isLoading = false
  }

  axios
    .get(url, { params })
    .then(handleSuccess)
    .catch(handleError)
    .finally(handleFinish)
}
