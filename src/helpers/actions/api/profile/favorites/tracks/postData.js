import axios from 'axios'
import store from '*/store'

export default function ({ trackId, albumTitle, imageUrl }) {
  this.isLoading = true

  const profileId =
    store.state.profile.info.id
  const url =
    `/profiles/${profileId}/favorites/tracks`

  const { token } = store.state.profile
  const params = {
    token,
    track_id: trackId,
    album: albumTitle,
    image_url: imageUrl
  }

  const handleSuccess = response => {
    this.setFavoriteId(
      response.data.favorite_id.toString()
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
