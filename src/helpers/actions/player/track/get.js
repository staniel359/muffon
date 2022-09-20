import getPlayerTrackAudio from '@/helpers/actions/player/track/audio/get'
import {
  updateGlobal as updateGlobalStore
} from '@/helpers/actions/store'

export default function (
  {
    trackData,
    queueTracks
  }
) {
  this.error = null
  this.isLoading = true

  const playerTrackAudioArgs = {
    trackData
  }

  const handleError = (
    error
  ) => {
    this.error = error
  }

  const handleFinish = () => {
    this.isLoading = false

    if (queueTracks) {
      updateGlobalStore(
        {
          'queue.tracks': queueTracks,
          'queue.isShuffle': false
        }
      )
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
