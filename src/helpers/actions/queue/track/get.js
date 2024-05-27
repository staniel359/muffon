import queueStore from '@/stores/queue'
import getPlayerTrackAudio from '@/helpers/actions/player/track/audio/get'
import getLocalAudio from '@/helpers/actions/local/audio/get'
import {
  update as updateGlobalStore
} from '@/helpers/actions/store/global'
import {
  setPlaying as setPlayerPlaying
} from '@/helpers/actions/player'

export default function getQueueTrack (
  {
    direction
  }
) {
  if (this) {
    this.error = null
    this.isLoading = true
  }

  const storeData = queueStore()

  const isDirectionAvailable =
    storeData.isDirectionAvailable[
      direction
    ]

  if (!isDirectionAvailable) {
    if (this) {
      this.isLoading = false
    }

    return
  }

  const followingTrackData =
    storeData.directionFollowingTrack[
      direction
    ]

  const isAudioLocal =
    !!followingTrackData.audio?.local

  function setFollowingTrackPlaying () {
    if (isAudioLocal) {
      getLocalAudio(
        {
          trackData: followingTrackData
        }
      )
    } else {
      setPlayerPlaying(
        followingTrackData
      )
    }

    updateGlobalStore(
      {
        'player.currentTrackId':
          followingTrackData.player_id,
        'player.variants': [],
        'queue.currentTrackId':
          followingTrackData.uuid
      }
    )
  }

  function setIsQueueGetting (
    value
  ) {
    switch (direction) {
      case 'previous':
        return storeData.setIsGettingPrevious(
          value
        )
      case 'next':
        return storeData.setIsGettingNext(
          value
        )
      default:
        return false
    }
  }

  const getFollowingTrackAudioData = () => {
    setIsQueueGetting(
      true
    )

    const playerTrackAudioArgs = {
      trackData: followingTrackData,
      isQueue: true
    }

    const handleSuccess = () => {
      setIsQueueGetting(
        false
      )
    }

    const handleError = () => {
      return retry()
    }

    const retry = async () => {
      setIsQueueGetting(
        false
      )

      await updateGlobalStore(
        {
          'queue.currentTrackId':
            followingTrackData.uuid
        }
      )

      const queueTrackArgs = {
        direction
      }

      return getQueueTrack.bind(
        this
      )(
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
    const isAudioLink =
      !!followingTrackData.audio?.link

    if (
      isAudioLink ||
        isAudioLocal
    ) {
      setFollowingTrackPlaying()
    } else {
      return getFollowingTrackAudioData()
    }
  } else {
    setIsQueueGetting(
      false
    )
  }
}
