import store from '&/store'
import getPlayerTrackAudio from '#/actions/player/track/audio/get'
import { updateStore } from '#/actions'

export default function getQueueTrack ({ position }) {
  const followingTrackData =
    store.getters[
      `queue/${position}Track`
    ]

  const setIsQueueFetching = value => {
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

  const fetchFollowingTrackAudioData = () => {
    setIsQueueFetching(true)

    const playerTrackAudioArgs = {
      trackTitle:
        followingTrackData.title,
      artistName:
        followingTrackData.artist.name,
      trackId:
        followingTrackData.player_id,
      audioData:
        followingTrackData.audio,
      queueTrackId:
        followingTrackData.uuid
    }

    const handleSuccess = () => {
      setIsQueueFetching(false)
    }

    const handleError = () => {
      retry()
    }

    const retry = () => {
      const queueCurrentTrackId =
        followingTrackData.uuid

      const queueTrackArgs = {
        position
      }

      updateStore({
        'queue.currentTrackId':
          queueCurrentTrackId
      })

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
    setIsQueueFetching(false)
  }
}
