import axios from 'axios'
import local from '#/plugins/local'

export default function ({ profileId, model, modelId }) {
  this.isLoading = true
  this.error = null

  const url =
    `profiles/${this.profileId}/library` +
    `/${this.model}s/${this.modelId}`

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
