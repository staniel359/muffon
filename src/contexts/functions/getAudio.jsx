import axios from 'axios'

export default function getAudio (track) {
  const { audio } = track

  this.request = axios.CancelToken.source()

  const audioId = () => {
    if (audio.source === 'bandcamp') {
      return encodeURIComponent(track.link)
    } else {
      return audio.id
    }
  }

  const url = `/${audio.source}/tracks/${audioId()}`

  const cancelToken = this.request.token
  const extra = { cancelToken }

  const setCurrentTrackData = resp => {
    this.setState({
      currentTrack: resp.data.track,
      currentTrackId: track.id,
      currentTrackAudioId: audioId(),
      currentTrackSource: audio.source,
      currentTrackIsFromAlbum: true,
      currentTrackVariants: null
    })
  }

  return axios.get(url, extra).then(setCurrentTrackData).then(this.setAudio)
}
