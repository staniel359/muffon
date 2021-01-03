import axios from 'axios'

export default function searchTrack (track) {
  this.request = axios.CancelToken.source()

  const url = '/vk/search/tracks'

  const query = `${track.artist} ${track.title}`
  const params = { query }

  const cancelToken = this.request.token
  const extra = { params, cancelToken }

  const setCurrentTrackVariants = resp => {
    this.setState({ currentTrackVariants: resp.data.search.tracks })
  }

  const getTrackVariant = () => {
    const variant = this.state.currentTrackVariants[0]

    return this.getTrackVariant(variant)
  }

  const setCurrentTrackId = () => {
    this.setState({ currentTrackId: track.id })
  }

  return axios
    .get(url, extra)
    .then(setCurrentTrackVariants)
    .then(getTrackVariant)
    .then(setCurrentTrackId)
}
