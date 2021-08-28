import axios from 'axios'
import local from '#/plugins/local'

export default function ({ recommendationId }) {
  this.isLoading = true
  this.error = null

  const profileId = local.get(
    'profile.info'
  ).id
  const url = `profiles/${profileId}` +
    `/recommendations/${recommendationId}`

  const token = local.get(
    'profile.token'
  )
  const params = { token }

  const handleSuccess = () => {
    this.isSuccess = true
  }

  const handleError = error => {
    this.error = error
  }

  const handleFinish = () => {
    this.isLoading = false
  }

  axios
    .delete(url, { params })
    .then(handleSuccess)
    .catch(handleError)
    .finally(handleFinish)
}
