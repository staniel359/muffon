import {
  getFollowingTrack as getQueueFollowingTrack,
  setIsFetching as setIsQueueFetching,
  setCurrentTrackId as setQueueCurrentTrackId
} from '#/actions/queue'
import fetchTrackAudioData from '#/actions/audio/track/fetchData'
import { handleEnvError } from '#/utils'

export default function fetchData ({ position }) {
  const followingTrackData = getQueueFollowingTrack({
    position
  })

  const startLoader = () => {
    setIsQueueFetching({ position }, true)
  }

  const stopLoader = () => {
    setIsQueueFetching({ position }, false)
  }

  const fetchFollowingTrackAudioData = () => {
    startLoader()

    const queueTrackDataArgs = {
      trackTitle: followingTrackData.title,
      artistName: followingTrackData.artist.name,
      trackId: followingTrackData.player_id,
      audioData: followingTrackData.audio,
      queueTrackId: followingTrackData.uuid
    }

    const handleSuccess = () => {
      stopLoader()
    }

    const handleError = error => {
      retry()

      handleEnvError(error)
    }

    const retry = () => {
      setQueueCurrentTrackId(
        followingTrackData.uuid
      )

      fetchData({ position })
    }

    return fetchTrackAudioData(queueTrackDataArgs)
      .then(handleSuccess)
      .catch(handleError)
  }

  if (followingTrackData) {
    fetchFollowingTrackAudioData()
  } else {
    stopLoader()
  }
}
