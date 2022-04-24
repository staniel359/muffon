import store from '*/plugins/store'
import getPlayerTrackAudio from '*/helpers/actions/player/track/audio/get'
import {
  updateGlobal as updateGlobalStore
} from '*/helpers/actions/store'

export default function getQueueTrack (
  {
    position
  }
) {
  const followingTrackData =
    store.getters[
      `queue/${position}Track`
    ]

  function setIsQueueGetting (
    value
  ) {
    switch (position) {
      case 'prev':
        return store.dispatch(
          'queue/setIsGettingPrev',
          value
        )
      case 'next':
        return store.dispatch(
          'queue/setIsGettingNext',
          value
        )
      default:
        return false
    }
  }

  function getFollowingTrackAudioData () {
    setIsQueueGetting(
      true
    )

    const playerTrackAudioArgs = {
      trackData: followingTrackData
    }

    function handleSuccess () {
      setIsQueueGetting(
        false
      )
    }

    function handleError () {
      retry()
    }

    function retry () {
      const queueTrackArgs = {
        position
      }

      updateGlobalStore(
        {
          'queue.currentTrackId':
            followingTrackData.uuid
        }
      )

      getQueueTrack(
        queueTrackArgs
      )
    }

    return getPlayerTrackAudio(
      playerTrackAudioArgs
    ).then(
      handleSuccess
    ).catch(
      handleError
    )
  }

  if (followingTrackData) {
    getFollowingTrackAudioData()
  } else {
    setIsQueueGetting(
      false
    )
  }
}
