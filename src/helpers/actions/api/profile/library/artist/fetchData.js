import axios from 'axios'

export default function ({ profileId, artistId, scope = '', page, limit }) {
  this.error = null
  this.isLoading = true

  const url =
    `/profiles/${profileId}/library` +
    `/artists/${artistId}/${scope}`
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

  return axios
    .get(url, { params })
    .then(handleSuccess)
    .catch(handleError)
    .finally(handleFinish)
}
