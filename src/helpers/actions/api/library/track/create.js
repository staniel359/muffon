import axios from 'axios'
import store from '*/plugins/store'

export default function ({
  trackTitle,
  artistName,
  albumTitle,
  image,
  imageUrl,
  created
}) {
  this.isError = false
  this.isLoading = true

  const profileId =
    store.state.profile.info.id
  const url =
    `/profiles/${profileId}/library/tracks`

  const { token } = store.state.profile
  const params = {
    token,
    title: trackTitle,
    artist_name: artistName,
    album_title: albumTitle,
    image,
    image_url: imageUrl,
    created_at: created
  }

  const handleError = error => {
    this.isError = true

    throw error
  }

  const handleFinish = () => {
    this.isLoading = false
  }

  return axios.post(
    url, params
  ).catch(
    handleError
  ).finally(
    handleFinish
  )
}
