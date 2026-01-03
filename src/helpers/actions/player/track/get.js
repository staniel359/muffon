import getPlayerTrackAudio from '@/helpers/actions/player/track/audio/get'
import getQueueTrack from '@/helpers/actions/queue/track/get'
import {
  update as updateGlobalStore
} from '@/helpers/actions/store/global'
import playerStore from '@/stores/player'

export default function getPlayerTrack (
  {
    source,
    trackData,
    isQueue,
    isContinuousList,
    queueTracks,
    queueTracksShuffled = [],
    isQueueShuffle = false,
    isQueueLoop = false,
    audioSourceIndex = 0
  }
) {
  this.error = null
  this.isLoading = true

  const {
    audioSources
  } = playerStore()

  const audioSource =
    audioSources[audioSourceIndex]

  const sourceComputed = (
    source || audioSource
  )

  const playerTrackAudioArgs = {
    source: sourceComputed,
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
          'queue.tracksShuffled': queueTracksShuffled
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

  const searchInNextAudioSource = (
    {
      error
    }
  )  => {
    const nextAudioSourceIndex = audioSourceIndex + 1

    const nextAudioSource =
      audioSources[nextAudioSourceIndex]

    if (nextAudioSource) {
      return getPlayerTrack.bind(
        this
      )(
        {
          trackData,
          isQueue,
          isContinuousList,
          queueTracks,
          queueTracksShuffled,
          isQueueShuffle,
          isQueueLoop,
          audioSourceIndex: nextAudioSourceIndex
        }
      )
    } else {
      this.error = error
    }
  }

  const handleError = (
    error
  ) => {
    if (isContinuousList) {
      return getQueueNextTrack()
    } else {
      const isSearchInNextAudioSource = !source

      if (isSearchInNextAudioSource) {
        return searchInNextAudioSource(
          {
            error
          }
        )
      } else {
        this.error = error
      }
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
