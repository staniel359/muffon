import axios from 'axios'
import local from '#/plugins/local'

export default function ({ page, limit }) {
  this.isLoading = true

  const profileId = local.get(
    'profile.info'
  ).id
  const url =
    `/profiles/${profileId}/recommendations`

  const token = local.get(
    'profile.token'
  )
  const params = {
    profileId,
    token,
    ...(page && { page }),
    ...(limit && { limit })
  }

  const handleSuccess = response => {
    this.error = null
    this.recommendationsData =
      response.data.profile
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
