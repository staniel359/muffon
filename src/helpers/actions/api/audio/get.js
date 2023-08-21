import getRequest from '@/helpers/actions/api/request/get'
import formatTrackRequestUrl from '@/helpers/formatters/request/track/url'
import {
  setPlaying as setPlayerPlaying
} from '@/helpers/actions/player'

export default function (
  {
    trackData,
    isSetPlayerPlaying = true
  }
) {
  const sourceData = trackData.source

  const url =
    formatTrackRequestUrl(
      {
        source: sourceData.name,
        trackId: sourceData.id,
        artistId: sourceData.artist_id
      }
    )

  const params = {
    with_audio: true
  }

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
      if (isSetPlayerPlaying) {
        setPlayerPlaying(
          playingData
        )
      } else {
        return playingData
      }
    } else {
      throw new Error()
    }
  }

  return getRequest(
    {
      url,
      params,
      isWithSelfToken: true,
      onSuccess: handleSuccess
    }
  )
}
