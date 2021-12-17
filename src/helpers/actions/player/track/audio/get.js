import store from '&/store'
import getSearch from '#/actions/api/player/search/get'
import getPlayerVariantAudio from '#/actions/player/variant/audio/get'
import getAudio from '#/actions/api/audio/get'
import { updateStore } from '#/actions'

export default function ({
  artistName,
  trackTitle,
  trackId,
  audioData,
  queueTrackId
}) {
  const handleAudioSuccess = () => {
    updateStore({
      'player.variants': []
    })

    setCurrentTrackIds()
  }

  const setCurrentTrackIds = () => {
    updateStore({
      'player.currentTrackId':
        trackId,
      'queue.currentTrackId':
        queueTrackId
    })
  }

  const searchAudio = () => {
    const query =
      `${artistName} - ${trackTitle}`
    const searchArgs = { query }

    return getSearch(
      searchArgs
    ).then(
      handleSearchSuccess
    )
  }

  const getFirstVariantId = () => {
    return store
      .state
      .player
      .variants[0]
      .uuid
  }

  const handleSearchSuccess = () => {
    const playerVariantAudioArgs = {
      variantId: getFirstVariantId()
    }

    return getPlayerVariantAudio(
      playerVariantAudioArgs
    ).then(
      handleVariantSuccess
    )
  }

  const handleVariantSuccess = () => {
    setCurrentTrackIds()

    updateStore({
      'player.currentVariantId':
        getFirstVariantId()
    })
  }

  if (audioData?.present) {
    const audioArgs = {
      audioData
    }

    return getAudio(
      audioArgs
    ).then(
      handleAudioSuccess
    )
  } else {
    return searchAudio()
  }
}
