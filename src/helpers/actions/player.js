import audioStore from '@/stores/audio'
import {
  update as updateGlobalStore
} from '@/helpers/actions/store/global'

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
  audioStore().setStatus(
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
  audioStore().setIsAutoplay(
    true
  )
}
