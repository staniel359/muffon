import playerStore from '@/stores/player'
import getPlayerSearch from '@/helpers/actions/api/player/search/get'
import getPlayerVariantAudio from '@/helpers/actions/player/variant/audio/get'
import {
  update as updateGlobalStore
} from '@/helpers/actions/store/global'

export default function (
  {
    source,
    trackData,
    queueTracks
  }
) {
  let variantIndex = 0

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
    source,
    query
  }

  function getVariantId () {
    const {
      variants
    } = playerStore()

    const variant =
      variants[
        variantIndex
      ]

    return variant?.uuid
  }

  function setCurrentTrackIds () {
    updateGlobalStore(
      {
        'player.currentTrackId':
          trackData.player_id
      }
    )

    if (queueTracks) {
      updateGlobalStore(
        {
          'queue.currentTrackId':
            trackData.uuid
        }
      )
    }
  }

  function handleVariantSuccess () {
    setCurrentTrackIds()

    updateGlobalStore(
      {
        'player.currentVariantId':
          getVariantId()
      }
    )
  }

  function handleVariantError (
    error
  ) {
    variantIndex++

    const variantId = getVariantId()

    if (variantId) {
      return getVariantAudio()
    } else {
      throw error
    }
  }

  function getVariantAudio () {
    const variantId = getVariantId()

    const isFromRadio =
      trackData.from_radio

    const playerVariantAudioArgs = {
      variantId,
      isFromRadio
    }

    return getPlayerVariantAudio(
      playerVariantAudioArgs
    ).then(
      handleVariantSuccess
    ).catch(
      handleVariantError
    )
  }

  function handleSearchSuccess () {
    return getVariantAudio()
  }

  return getPlayerSearch(
    searchArgs
  ).then(
    handleSearchSuccess
  )
}
