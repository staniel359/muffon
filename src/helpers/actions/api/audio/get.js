import axios from 'axios'
import formatRequestUrl from '#/formatters/request/track/requestUrl'
import { setPlayerPlaying } from '#/actions'

export default function ({ trackData }) {
  const audioData = trackData.audio

  const formatUrl = () => {
    const sourceId = audioData.source_id

    const idData = audioData.id

    const artistId = (
      audioData.artist_id ||
        idData?.artists?.[0]?.bandcamp_id
    )

    const trackId = (
      audioData.track_id ||
        idData?.bandcamp_id
    )

    return formatRequestUrl({
      sourceId,
      artistId,
      trackId
    })
  }

  const url = formatUrl()

  const handleSuccess = response => {
    const { album, image } = trackData

    const playingData = {
      ...trackData,
      ...response.data.track,
      album,
      image
    }

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
