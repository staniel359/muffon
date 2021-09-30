import axios from 'axios'
import store from '*/store'

export default function ({ trackId }) {
  this.isLoading = true

  const profileId =
    store.state.profile.info.id
  const url =
    `/profiles/${profileId}/listened/tracks`

  const { token } = store.state.profile
  const params = {
    token,
    track_id: trackId
  }

  const handleSuccess = response => {
    this.setListenedId(
      response.data.listened_id.toString()
    )
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
