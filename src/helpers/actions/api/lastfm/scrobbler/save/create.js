import axios from 'axios'
import store from '&/store'

export default function ({ title, artistName, albumTitle, duration }) {
  const profileId =
    store.state.profile.info.id
  const url =
    `/profiles/${profileId}/lastfm/scrobbler/save`

  const token =
    store.state.profile.token
  const params = {
    token,
    title,
    artist_name: artistName,
    album_title: albumTitle,
    duration
  }

  return axios.post(
    url, params
  )
}
