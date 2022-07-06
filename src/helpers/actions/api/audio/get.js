import getRequest from '*/helpers/actions/api/request/get'
import formatTrackRequestUrl from '*/helpers/formatters/request/track/url'
import {
  setPlaying as setPlayerPlaying
} from '*/helpers/actions/player'

export default function (
  {
    trackData
  }
) {
  const sourceData = trackData.source

  const url = formatTrackRequestUrl(
    {
      source: sourceData.name,
      artistId: sourceData.artist_id,
      trackId: sourceData.id
    }
  )

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

    const {
      audio
    } = response.data.track

    const isAudioPresent = (
      audio.present &&
        audio.link
    )

    if (isAudioPresent) {
      setPlayerPlaying(
        playingData
      )
    } else {
      throw new Error()
    }
  }

  return getRequest(
    {
      url,
      onSuccess: handleSuccess
    }
  )
}
