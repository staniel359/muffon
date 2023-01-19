import getAudio from '@/helpers/actions/api/audio/get'
import getPlayerTrackAudioSearch
  from '@/helpers/actions/player/track/audio/search/get'
import {
  updateGlobal as updateGlobalStore
} from '@/helpers/actions/store'

export default function (
  {
    source,
    trackData
  }
) {
  const isAudioPresent =
    trackData?.audio?.present

  const audioArgs = {
    trackData
  }

  function setCurrentTrackIds () {
    updateGlobalStore(
      {
        'player.currentTrackId':
          trackData.player_id,
        'queue.currentTrackId':
          trackData.uuid
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
    source,
    trackData
  }

  const isGetAudio = (
    isAudioPresent && !source
  )

  if (isGetAudio) {
    return getAudio(
      audioArgs
    ).then(
      handleSuccess
    )
  } else {
    return getPlayerTrackAudioSearch(
      playerTrackAudioArgs
    )
  }
}
