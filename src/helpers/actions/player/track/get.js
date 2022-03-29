import getPlayerTrackAudio from '*/helpers/actions/player/track/audio/get'
import { updateStore } from '*/helpers/actions'

export default function ({ trackData, queueTracks }) {
  this.error = null
  this.isLoading = true

  const playerTrackAudioArgs = {
    trackData
  }

  const handleError = error => {
    this.error = error
  }

  const handleFinish = () => {
    this.isLoading = false

    if (queueTracks) {
      updateStore({
        'queue.tracks': queueTracks
      })
    }
  }

  return getPlayerTrackAudio(
    playerTrackAudioArgs
  ).catch(
    handleError
  ).finally(
    handleFinish
  )
}
