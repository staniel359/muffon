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

  function setIsQueueFetching (
    value
  ) {
    switch (position) {
      case 'prev':
        return store.dispatch(
          'queue/setIsFetchingPrev',
          value
        )
      case 'next':
        return store.dispatch(
          'queue/setIsFetchingNext',
          value
        )
      default:
        return false
    }
  }

  function fetchFollowingTrackAudioData () {
    setIsQueueFetching(
      true
    )

    const playerTrackAudioArgs = {
      trackData: followingTrackData
    }

    function handleSuccess () {
      setIsQueueFetching(
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
    fetchFollowingTrackAudioData()
  } else {
    setIsQueueFetching(
      false
    )
  }
}
