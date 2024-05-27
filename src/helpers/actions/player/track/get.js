import getPlayerTrackAudio from '@/helpers/actions/player/track/audio/get'
import getQueueTrack from '@/helpers/actions/queue/track/get'
import {
  update as updateGlobalStore
} from '@/helpers/actions/store/global'

export default function (
  {
    source,
    trackData,
    isQueue,
    queueTracks,
    isSkipOnError
  }
) {
  this.error = null
  this.isLoading = true

  const playerTrackAudioArgs = {
    source,
    trackData,
    isQueue
  }

  const getQueueNextTrack = async () => {
    await updateGlobalStore(
      {
        'queue.tracks': queueTracks,
        'queue.isShuffle': false,
        'queue.currentTrackId': trackData.uuid,
        'queue.isGettingNext': false
      }
    )

    const queueArgs = {
      direction: 'next'
    }

    return getQueueTrack.bind(
      this
    )(
      queueArgs
    )
  }

  const handleError = (
    error
  ) => {
    if (isSkipOnError) {
      return getQueueNextTrack()
    } else {
      this.error = error
    }
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
