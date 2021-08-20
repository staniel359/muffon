import axios from 'axios'

export default function ({ profileId, albumId, scope = '', page, limit }) {
  this.isLoading = true

  const url =
    `/profiles/${profileId}/library` +
    `/albums/${albumId}/${scope}`
  const params = {
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

  return axios
    .get(url, { params })
    .then(handleSuccess)
    .catch(handleError)
    .finally(handleFinish)
}
