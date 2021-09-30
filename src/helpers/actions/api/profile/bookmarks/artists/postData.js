import axios from 'axios'
import store from '*/store'

export default function ({ artistId }) {
  this.isLoading = true

  const profileId =
    store.state.profile.info.id
  const url =
    `profiles/${profileId}/bookmarks/artists`

  const { token } = store.state.profile
  const params = {
    token,
    artist_id: artistId
  }

  const handleSuccess = response => {
    this.setBookmarkId(
      response.data.bookmark_id.toString()
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
