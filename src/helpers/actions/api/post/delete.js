import axios from 'axios'
import store from '*/plugins/store'

export default function ({ postId }) {
  this.error = null
  this.isLoading = true

  const profileId =
    store.state.profile.info.id
  const url =
    `/profiles/${profileId}/posts/${postId}`

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
