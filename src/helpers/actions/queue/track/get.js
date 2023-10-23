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
    position
  }
) {
  const followingTrackData =
    queueStore()[
      `${position}Track`
    ]

  const isAudioLocal =
    followingTrackData.audio?.local

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
    switch (position) {
      case 'previous':
        return queueStore().setIsGettingPrevious(
          value
        )
      case 'next':
        return queueStore().setIsGettingNext(
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
      trackData: followingTrackData,
      isQueue: true
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
    const isAudioLink =
      followingTrackData.audio?.link

    if (
      isAudioLink ||
        isAudioLocal
    ) {
      setFollowingTrackPlaying()
    } else {
      getFollowingTrackAudioData()
    }
  } else {
    setIsQueueGetting(
      false
    )
  }
}
