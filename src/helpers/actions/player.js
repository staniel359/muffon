import store from '*/plugins/store'
import {
  updateGlobal as updateGlobalStore
} from '*/helpers/actions/store'

export function setPlaying (
  value
) {
  function setPlayerPlaying () {
    return updateGlobalStore(
      {
        'player.playing': value
      }
    )
  }

  disableGlobalAudioAutoplay().then(
    setPlayerPlaying
  ).then(
    enableLocalAudioAutoplay
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

function enableLocalAudioAutoplay () {
  store.dispatch(
    'audio/setIsAutoplay',
    true
  )
}
