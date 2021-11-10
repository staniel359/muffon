import axios from 'axios'

export default function ({ profileId, trackTitle, artistName, page, limit }) {
  this.isLoading = true

  const url = `/profiles/${profileId}/playlists`

  const params = {
    track_title: trackTitle,
    artist_name: artistName,
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
