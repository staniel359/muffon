import store from '&/store'
import getSearch from '#/actions/api/player/search/get'
import getPlayerVariantAudio from '#/actions/player/variant/audio/get'
import { updateStore } from '#/actions'
import { artistName as formatArtistName } from '#/formatters/artist'

export default function ({ trackData }) {
  const artistData = trackData.artist

  const artists = artistData
    ? [artistData]
    : trackData.artists

  const artistName =
    formatArtistName(
      artists
    )

  const trackTitle = trackData.title

  const query =
    `${artistName} - ${trackTitle}`

  const searchArgs = { query }

  const getFirstVariantId = () => {
    return store
      .state
      .player
      .variants[0]
      .uuid
  }

  const setCurrentTrackIds = () => {
    const trackId = trackData.player_id
    const queueTrackId = trackData.uuid

    updateStore({
      'player.currentTrackId':
        trackId,
      'queue.currentTrackId':
        queueTrackId
    })
  }

  const handleVariantSuccess = () => {
    setCurrentTrackIds()

    updateStore({
      'player.currentVariantId':
        getFirstVariantId()
    })
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

  return getSearch(
    searchArgs
  ).then(
    handleSearchSuccess
  )
}
