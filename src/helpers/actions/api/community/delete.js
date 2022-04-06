import axios from 'axios'
import store from '*/plugins/store'

export default function ({ communityId }) {
  this.error = null
  this.isLoading = true

  const url = `/communities/${communityId}`

  const profileId =
    store.state.profile.info.id

  const { token } = store.state.profile

  const params = {
    profile_id: profileId,
    token
  }

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
