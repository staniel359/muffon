import axios from 'axios'
import store from '&/store'

export default function () {
  this.error = null
  this.isLoading = true

  const nickname =
    store.state.profile.info.lastfm_nickname
  const url = `lastfm/users/${nickname}`

  const handleSuccess = response => {
    this.isReset = false
    this.userData = response.data.user
  }

  const handleError = error => {
    this.error = error
  }

  const handleFinish = () => {
    this.isLoading = false
  }

  return axios
    .get(url)
    .then(handleSuccess)
    .catch(handleError)
    .finally(handleFinish)
}
