import axios from 'axios'
import store from '&/store'

export default function ({
  recommendationId,
  scope = '',
  page,
  limit
}) {
  this.error = null
  this.isLoading = true

  const profileId =
    store.state.profile.info.id
  const url = (
    `/profiles/${profileId}` +
    `/recommendations/${recommendationId}` +
    `/${scope}`
  )

  const { token } = store.state.profile
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

  return axios.get(
    url, { params }
  ).then(
    handleSuccess
  ).catch(
    handleError
  ).finally(
    handleFinish
  )
}
