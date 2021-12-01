import axios from 'axios'

export default function ({ page, limit }) {
  this.error = null
  this.isLoading = true

  const url = '/profiles'
  const params = {
    ...(page && { page }),
    ...(limit && { limit })
  }

  const handleSuccess = response => {
    this.profilesData = response.data.profiles
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
