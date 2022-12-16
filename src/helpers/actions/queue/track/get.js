import queueStore from '@/stores/queue'
import getPlayerTrackAudio from '@/helpers/actions/player/track/audio/get'
import {
  updateGlobal as updateGlobalStore
} from '@/helpers/actions/store'
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

  function setFollowingTrackPlaying () {
    updateGlobalStore(
      {
        'player.currentTrackId':
          followingTrackData.player_id,
        'player.variants': [],
        'queue.currentTrackId':
          followingTrackData.uuid
      }
    )

    setPlayerPlaying(
      followingTrackData
    )
  }

  function setIsQueueGetting (
    value
  ) {
    switch (position) {
      case 'prev':
        return queueStore().setIsGettingPrev(
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
    const isAudioLink =
      followingTrackData.audio?.link

    const isAudioLocal =
      followingTrackData.audio?.local

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
