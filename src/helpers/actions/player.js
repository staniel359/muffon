import store from '*/plugins/store'
import {
  updateStore
} from '*/helpers/actions'

export function setPlaying (
  value
) {
  function setPlayerPlaying () {
    return updateStore(
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
  return updateStore(
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
