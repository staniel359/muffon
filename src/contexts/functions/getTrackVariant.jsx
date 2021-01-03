import axios from 'axios'

export default function getTrackVariant (variant) {
  const { audio } = variant

  this.request = axios.CancelToken.source()

  const url = `/vk/tracks/${audio.id}`

  const cancelToken = this.request.token
  const extra = { cancelToken }

  const setCurrentTrackData = resp => {
    this.setState({
      currentTrack: resp.data.track,
      currentTrackAudioId: audio.id,
      currentTrackSource: audio.source,
      currentTrackIsFromAlbum: false
    })
  }

  return axios.get(url, extra).then(setCurrentTrackData).then(this.setAudio)
}
