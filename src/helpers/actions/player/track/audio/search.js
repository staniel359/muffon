import store from '*/plugins/store'
import getPlayerSearch from '*/helpers/actions/api/player/search/get'
import getPlayerVariantAudio from '*/helpers/actions/player/variant/audio/get'
import {
  updateGlobal as updateGlobalStore
} from '*/helpers/actions/store'
import {
  artistName as formatArtistName
} from '*/helpers/formatters'

export default function (
  {
    trackData
  }
) {
  const artists = (
    trackData.artists ||
      [
        trackData.artist
      ]
  )

  const artistName =
    formatArtistName(
      artists
    )

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
    const trackId = trackData.player_id
    const queueTrackId = trackData.uuid

    updateGlobalStore(
      {
        'player.currentTrackId':
        trackId,
        'queue.currentTrackId':
        queueTrackId
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
      variantId: getFirstVariantId()
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
