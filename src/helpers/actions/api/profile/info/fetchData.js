import axios from 'axios'
import { setGlobalData } from '#/actions'

export default function ({ profileId }) {
  this.isLoading = true

  const url = `/profiles/${profileId}`
  const params = {}

  const handleSuccess = response => {
    const info = response.data.profile

    setGlobalData({
      'profile.info': info
    })
  }

  const handleError = error => {
    this.error = error
  }

  const handleFinish = () => {
    this.isLoading = false
  }

  return axios
    .get(url, params)
    .then(handleSuccess)
    .catch(handleError)
    .finally(handleFinish)
}
