import store from '*/plugins/store'
import getBandcampId from '*/helpers/actions/api/bandcampId/track/variant/get'
import getAudio from '*/helpers/actions/api/audio/get'
import {
  updateStore
} from '*/helpers/actions'

export default async function (
  {
    variantId
  }
) {
  function isMatchedVariant (
    variantData
  ) {
    return (
      variantData.uuid ===
        variantId
    )
  }

  const trackData =
    store
      .state
      .player
      .variants
      .find(
        isMatchedVariant
      )

  function getAudioArgs () {
    const isBandcampVariant = (
      trackData.audio.source_id ===
        'bandcamp'
    )

    const bandcampIdArgs = {
      trackData
    }

    if (isBandcampVariant) {
      return getBandcampId(
        bandcampIdArgs
      )
    } else {
      return trackData.audio
    }
  }

  const audioArgs = {
    trackData: {
      ...trackData,
      audio: await getAudioArgs()
    }
  }

  function handleSuccess () {
    updateStore(
      {
        'player.currentVariantId':
        variantId
      }
    )
  }

  return getAudio(
    audioArgs
  ).then(
    handleSuccess
  )
}
