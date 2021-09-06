import axios from 'axios'
import store from '*/store'

export default function ({ artistName }) {
  this.isLoading = true

  const profileId =
    store.state.profile.info.id
  const url =
    `profiles/${profileId}/library/artists`

  const { token } = store.state.profile
  const params = {
    token,
    artist: artistName
  }

  const handleSuccess = response => {
    this.libraryId =
      response.data.library_id
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
    .then(handleSuccess)
    .catch(handleError)
    .finally(handleFinish)
}
