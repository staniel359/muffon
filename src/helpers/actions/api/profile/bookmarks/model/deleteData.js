import axios from 'axios'
import store from '*/store'

export default function ({ model, bookmarkId }) {
  this.isLoading = true
  this.error = null

  const profileId =
    store.state.profile.info.id
  const url =
    `profiles/${profileId}` +
    `/bookmarks/${model}s/${bookmarkId}`

  const { token } = store.state.profile
  const params = { token }

  const handleSuccess = () => {
    this.setBookmarkId(null)
  }

  const handleError = error => {
    this.error = error
  }

  const handleFinish = () => {
    this.isLoading = false
  }

  return axios
    .delete(url, { params })
    .then(handleSuccess)
    .catch(handleError)
    .finally(handleFinish)
}
