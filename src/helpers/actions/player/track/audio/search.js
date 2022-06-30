import store from '*/plugins/store'
import getPlayerSearch from '*/helpers/actions/api/player/search/get'
import getPlayerVariantAudio from '*/helpers/actions/player/variant/audio/get'
import {
  updateGlobal as updateGlobalStore
} from '*/helpers/actions/store'

export default function (
  {
    trackData
  }
) {
  const artistName =
    trackData.artist.name
  const trackTitle = trackData.title

  const query = [
    artistName,
    trackTitle
  ].join(
    ' - '
  )

  const searchArgs = {
    query
  }

  function getFirstVariantId () {
    return store
      .state
      .player
      .variants[0]
      .uuid
  }

  function setCurrentTrackIds () {
    updateGlobalStore(
      {
        'player.currentTrackId':
          trackData.player_id,
        'queue.currentTrackId':
          trackData.uuid
      }
    )
  }

  function handleVariantSuccess () {
    setCurrentTrackIds()

    updateGlobalStore(
      {
        'player.currentVariantId':
          getFirstVariantId()
      }
    )
  }

  function handleSearchSuccess () {
    const playerVariantAudioArgs = {
      variantId: getFirstVariantId(),
      isFromRadio: trackData.from_radio
    }

    return getPlayerVariantAudio(
      playerVariantAudioArgs
    ).then(
      handleVariantSuccess
    )
  }

  return getPlayerSearch(
    searchArgs
  ).then(
    handleSearchSuccess
  )
}
