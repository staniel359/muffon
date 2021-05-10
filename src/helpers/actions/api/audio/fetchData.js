import axios from 'axios'
import { setPlaying as setPlayerPlaying } from '#/actions/player'
import { playing as formatPlaying } from '#/formatters/player/playing'

export default function ({ audioData }) {
  const sourceId = audioData.source
  const audioId = audioData.id
  const artistId = audioData.artist?.id

  const formatSourceId = () => {
    if (sourceId === 'bandcamp') {
      return `${sourceId}/artists/${artistId}`
    } else {
      return sourceId
    }
  }

  const url = `/${formatSourceId()}/tracks/${audioId}`

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
