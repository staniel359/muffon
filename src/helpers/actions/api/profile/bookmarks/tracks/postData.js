import axios from 'axios'
import store from '*/store'

export default function ({
  title,
  artistName
}) {
  this.isLoading = true

  const profileId =
    store.state.profile.info.id
  const url =
    `/profiles/${profileId}/bookmarks/tracks`

  const { token } = store.state.profile
  const params = {
    token,
    title,
    artist: artistName
  }

  const handleSuccess = response => {
    this.bookmarkId =
      response.data.bookmark_id
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
