import axios from 'axios'
import store from '&/store'

export default function ({ albumTitle, artistName, imageUrl }) {
  this.isError = false
  this.isLoading = true

  const profileId =
    store.state.profile.info.id
  const url =
    `/profiles/${profileId}/listened/albums`

  const { token } = store.state.profile
  const params = {
    token,
    title: albumTitle,
    artist_name: artistName,
    image_url: imageUrl
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
