import getAudio from '*/helpers/actions/api/audio/get'
import searchPlayerTrackAudio
  from '*/helpers/actions/player/track/audio/search'
import {
  updateStore
} from '*/helpers/actions'

export default function (
  {
    trackData
  }
) {
  const isAudioPresent =
    trackData?.audio?.present

  const audioArgs = {
    trackData
  }

  function setCurrentTrackIds () {
    const trackId = trackData.player_id
    const queueTrackId = trackData.uuid

    updateStore(
      {
        'player.currentTrackId':
        trackId,
        'queue.currentTrackId':
        queueTrackId
      }
    )
  }

  function handleSuccess () {
    updateStore(
      {
        'player.variants': []
      }
    )

    setCurrentTrackIds()
  }

  const playerTrackAudioArgs = {
    trackData
  }

  if (isAudioPresent) {
    return getAudio(
      audioArgs
    ).then(
      handleSuccess
    )
  } else {
    return searchPlayerTrackAudio(
      playerTrackAudioArgs
    )
  }
}
