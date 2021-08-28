import axios from 'axios'
import local from '#/plugins/local'

export default function ({
  recommendationId,
  scope = '',
  page,
  limit
}) {
  this.isLoading = true
  this.error = null

  const profileId = local.get(
    'profile.info'
  ).id
  const url = `profiles/${profileId}` +
    `/recommendations/${recommendationId}` +
    '/artists'

  const token = local.get(
    'profile.token'
  )
  const params = {
    token,
    ...(page && { page }),
    ...(limit && { limit })
  }

  const handleSuccess = response => {
    this.recommendationData =
      response.data.recommendation
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
