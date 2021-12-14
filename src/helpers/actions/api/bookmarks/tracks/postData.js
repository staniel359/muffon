import axios from 'axios'
import store from '&/store'

export default function ({ trackTitle, artistName, albumTitle, imageUrl }) {
  this.isError = false
  this.isLoading = true

  const profileId =
    store.state.profile.info.id
  const url =
    `/profiles/${profileId}/bookmarks/tracks`

  const { token } = store.state.profile
  const params = {
    token,
    title: trackTitle,
    artist_name: artistName,
    album_title: albumTitle,
    image_url: imageUrl
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
    .catch(handleError)
    .finally(handleFinish)
}
