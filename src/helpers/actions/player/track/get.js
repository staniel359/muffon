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
    isContinuousList,
    queueTracks,
    queueTracksShuffled = [],
    isQueueShuffle = false,
    isQueueLoop = false
  }
) {
  this.error = null
  this.isLoading = true

  const playerTrackAudioArgs = {
    source,
    trackData,
    isQueue
  }

  async function setPlayableListData () {
    await updateGlobalStore(
      {
        'queue.isShuffle': isQueueShuffle,
        'queue.isLoop': isQueueLoop
      }
    )

    if (isQueueShuffle) {
      return updateGlobalStore(
        {
          'queue.tracksShuffled':
            queueTracksShuffled
        }
      )
    }
  }

  function setQueueTracks () {
    return updateGlobalStore(
      {
        'queue.tracks': queueTracks
      }
    )
  }

  const getQueueNextTrack = async () => {
    await setPlayableListData()

    await setQueueTracks()

    await updateGlobalStore(
      {
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
    if (isContinuousList) {
      return getQueueNextTrack()
    } else {
      this.error = error
    }
  }

  const handleFinish = async () => {
    this.isLoading = false

    if (queueTracks) {
      await setPlayableListData()

      return setQueueTracks()
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
