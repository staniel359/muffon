import axios from 'axios'
import formatTrackRequestUrl from '*/helpers/formatters/request/track/url'
import {
  setPlaying as setPlayerPlaying
} from '*/helpers/actions/player'

export default function (
  {
    trackData
  }
) {
  const audioData = trackData.audio

  function formatUrl () {
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

    return formatTrackRequestUrl(
      {
        sourceId,
        artistId,
        trackId
      }
    )
  }

  const url = formatUrl()

  function handleSuccess (
    response
  ) {
    const {
      album,
      image
    } = trackData

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
