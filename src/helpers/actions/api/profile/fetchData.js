import axios from 'axios'

export default function ({ profileId, token, scope = '' }) {
  this.isLoading = true

  const url = `/profiles/${profileId}/${scope}`
  const params = { token }

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
