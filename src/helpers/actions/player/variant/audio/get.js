import store from '&/store'
import getBandcampId from '#/actions/api/bandcamp_id/track/variant/get'
import getAudio from '#/actions/api/audio/get'
import { updateStore } from '#/actions'

export default async function ({ variantId }) {
  const isMatchedVariant = variantData => {
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

  const getAudioArgs = () => {
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
    audioData:
      await getAudioArgs()
  }

  const handleSuccess = () => {
    updateStore({
      'player.currentVariantId':
        variantId
    })
  }

  return getAudio(audioArgs)
    .then(handleSuccess)
}
