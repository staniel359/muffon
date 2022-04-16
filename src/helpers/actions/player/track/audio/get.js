import getAudio from '*/helpers/actions/api/audio/get'
import searchPlayerTrackAudio
  from '*/helpers/actions/player/track/audio/search'
import {
  updateGlobal as updateGlobalStore
} from '*/helpers/actions/store'

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

    updateGlobalStore(
      {
        'player.currentTrackId':
        trackId,
        'queue.currentTrackId':
        queueTrackId
      }
    )
  }

  function handleSuccess () {
    updateGlobalStore(
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
