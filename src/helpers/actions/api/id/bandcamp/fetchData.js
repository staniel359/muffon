import axios from 'axios'

export default function ({ model, artist, title }) {
  const formatModelUrl = () => {
    const isAlbumOrTrack = [
      'album', 'track'
    ].includes(model)

    if (isAlbumOrTrack) {
      return `${model}s/${title}`
    } else {
      return ''
    }
  }

  const url =
    `/bandcamp/id/${artist}/${formatModelUrl()}`

  const params = {}

  const handleSuccess = response => {
    return response.data
  }

  return axios
    .get(url, { params })
    .then(handleSuccess)
}
