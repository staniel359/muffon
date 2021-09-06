import axios from 'axios'
import store from '*/store'

export default function ({ recommendationId }) {
  this.isLoading = true
  this.error = null

  const profileId =
    store.state.profile.info.id
  const url = `profiles/${profileId}` +
    `/recommendations/${recommendationId}`

  const { token } = store.state.profile
  const params = { token }

  const handleError = error => {
    this.error = error
  }

  const handleFinish = () => {
    this.isLoading = false
  }

  return axios
    .delete(url, { params })
    .catch(handleError)
    .finally(handleFinish)
}
