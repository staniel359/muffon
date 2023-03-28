import playerStore from '@/stores/player'
import getAudio from '@/helpers/actions/api/audio/get'
import {
  update as updateGlobalStore
} from '@/helpers/actions/store/global'

export default async function (
  {
    variantId,
    isFromRadio
  }
) {
  const {
    variants
  } = playerStore()

  function isMatchedVariant (
    variantData
  ) {
    return (
      variantData.uuid ===
        variantId
    )
  }

  const trackData =
    variants.find(
      isMatchedVariant
    )

  trackData.from_radio = isFromRadio

  const audioArgs = {
    trackData
  }

  function handleSuccess () {
    updateGlobalStore(
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
