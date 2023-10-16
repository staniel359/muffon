import getRemoteAudio from '@/helpers/actions/api/audio/get'
import getLocalAudio from '@/helpers/actions/local/audio/get'
import getPlayerTrackAudioSearch
  from '@/helpers/actions/player/track/audio/search/get'
import {
  update as updateGlobalStore
} from '@/helpers/actions/store/global'

export default function (
  {
    source,
    trackData,
    queueTracks
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
    trackData,
    queueTracks
  }

  const isGetAudio = (
    isAudioPresent && !source
  )

  function getAudio () {
    const isLocal =
      trackData.audio.local

    if (isLocal) {
      return getLocalAudio(
        audioArgs
      )
    } else {
      return getRemoteAudio(
        audioArgs
      )
    }
  }

  if (isGetAudio) {
    return getAudio().then(
      handleSuccess
    )
  } else {
    return getPlayerTrackAudioSearch(
      playerTrackAudioArgs
    )
  }
}
