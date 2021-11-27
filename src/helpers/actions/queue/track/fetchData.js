import store from '&/store'
import fetchTrackAudioData from '#/actions/audio/track/fetchData'
import { updateStore } from '#/actions'

export default function fetchData ({ position }) {
  const followingTrackData = store.getters[
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

    const queueTrackDataArgs = {
      trackTitle: followingTrackData.title,
      artistName: followingTrackData.artist.name,
      trackId: followingTrackData.player_id,
      audioData: followingTrackData.audio,
      queueTrackId: followingTrackData.uuid
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

      updateStore({
        'queue.currentTrackId': queueCurrentTrackId
      })

      fetchData({ position })
    }

    return fetchTrackAudioData(queueTrackDataArgs)
      .then(handleSuccess)
      .catch(handleError)
  }

  if (followingTrackData) {
    fetchFollowingTrackAudioData()
  } else {
    setIsQueueFetching(false)
  }
}
