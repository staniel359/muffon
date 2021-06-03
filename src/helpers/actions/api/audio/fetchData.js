import axios from 'axios'
import { setPlaying as setPlayerPlaying } from '#/actions/player'
import { playing as formatPlaying } from '#/formatters/player/playing'

export default function ({ audioData }) {
  const formatUrl = () => {
    const sourceId = audioData.source_id

    if (sourceId === 'bandcamp') {
      const idData = audioData.id
      const artistId =
        audioData.artist_id ||
          idData.artists[0].bandcamp_id
      const trackId =
        audioData.track_id ||
          idData.bandcamp_id

      return `${sourceId}/artists/${artistId}/tracks/${trackId}`
    } else {
      const trackId = audioData.track_id

      return `${sourceId}/tracks/${trackId}`
    }
  }

  const url = formatUrl()
  const params = {}

  const handleSuccess = response => {
    const playingData = formatPlaying({
      trackData: response.data.track,
      audioData
    })

    setPlayerPlaying(playingData)
  }

  return axios
    .get(url, { params })
    .then(handleSuccess)
}
