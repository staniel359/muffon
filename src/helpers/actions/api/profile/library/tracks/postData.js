import axios from 'axios'
import store from '*/store'

export default function ({ trackId, albumTitle, image, imageUrl, created }) {
  this.isLoading = true

  const profileId =
    store.state.profile.info.id
  const url =
    `/profiles/${profileId}/library/tracks`

  const { token } = store.state.profile
  const params = {
    token,
    track_id: trackId,
    album: albumTitle,
    image,
    image_url: imageUrl,
    created_at: created
  }

  const handleSuccess = response => {
    this.setLibraryId(
      response.data.library_id.toString()
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
