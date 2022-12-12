import store from '@/plugins/store'
import {
  updateGlobal as updateGlobalStore
} from '@/helpers/actions/store'

export async function setPlaying (
  value
) {
  setLocalAudioPauseStatus()

  await disableGlobalAudioAutoplay()

  await setPlayerPlaying(
    value
  )

  enableLocalAudioAutoplay()
}

function setLocalAudioPauseStatus () {
  store.dispatch(
    'audio/setStatus',
    'pause'
  )
}

function disableGlobalAudioAutoplay () {
  return updateGlobalStore(
    {
      'audio.isAutoplay': false
    },
    {
      isSave: false
    }
  )
}

function setPlayerPlaying (
  value
) {
  return updateGlobalStore(
    {
      'player.playing': value
    }
  )
}

function enableLocalAudioAutoplay () {
  store.dispatch(
    'audio/setIsAutoplay',
    true
  )
}
