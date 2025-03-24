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
    isQueue
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

  function handleError () {
    return getPlayerTrackAudioSearch(
      playerTrackAudioArgs
    )
  }

  const playerTrackAudioArgs = {
    source,
    trackData,
    isQueue
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
    ).catch(
      handleError
    )
  } else {
    return getPlayerTrackAudioSearch(
      playerTrackAudioArgs
    )
  }
}
