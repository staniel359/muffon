import axios from 'axios'
import store from '*/store'

export default function ({
  playlistId,
  trackTitle,
  artistName,
  albumTitle,
  image,
  imageUrl,
  created
}) {
  this.isLoading = true
  this.isError = false

  const profileId =
    store.state.profile.info.id
  const url =
    `/profiles/${profileId}/playlists/${playlistId}/tracks`

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

  const handleSuccess = response => {
    this.playlistTrackId =
      response.data.playlist_track_id

    this.isSuccess = true
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
