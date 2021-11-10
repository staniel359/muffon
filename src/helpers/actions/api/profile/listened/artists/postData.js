import axios from 'axios'
import store from '*/store'

export default function ({ artistName }) {
  this.isLoading = true

  const profileId =
    store.state.profile.info.id
  const url =
    `profiles/${profileId}/listened/artists`

  const { token } = store.state.profile
  const params = {
    token,
    name: artistName
  }

  const handleError = error => {
    this.isError = true

    throw error
  }

  const handleFinish = () => {
    this.isLoading = false
  }

  return axios
    .post(url, params)
    .catch(handleError)
    .finally(handleFinish)
}
