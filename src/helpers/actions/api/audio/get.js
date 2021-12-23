import axios from 'axios'
import formatPlaying from '#/formatters/player/playing'
import { setPlayerPlaying } from '#/actions'

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

      return (
        `${sourceId}` +
        `/artists/${artistId}` +
        `/tracks/${trackId}`
      )
    } else {
      const trackId = audioData.track_id

      return `${sourceId}/tracks/${trackId}`
    }
  }

  const url = formatUrl()

  const handleSuccess = response => {
    const trackData =
      response.data.track

    const playingData =
      formatPlaying({
        trackData,
        audioData
      })

    setPlayerPlaying(
      playingData
    )
  }

  return axios.get(
    url
  ).then(
    handleSuccess
  )
}
