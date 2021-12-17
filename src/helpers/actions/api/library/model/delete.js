import axios from 'axios'
import store from '&/store'

export default function ({ model, modelId }) {
  this.error = null
  this.isLoading = true

  const profileId =
    store.state.profile.info.id
  const url =
    `/profiles/${profileId}` +
    `/library/${model}s/${modelId}`

  const { token } = store.state.profile
  const params = { token }

  const handleError = error => {
    this.error = error

    throw error
  }

  const handleFinish = () => {
    this.isLoading = false
  }

  return axios.delete(
    url, { params }
  ).catch(
    handleError
  ).finally(
    handleFinish
  )
}
