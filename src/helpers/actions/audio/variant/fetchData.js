import store from '&/store'
import fetchBandcampIdData from './id/bandcamp/fetchData'
import fetchAudioData from '#/actions/api/audio/fetchData'
import { updateStore } from '#/actions'

export default async function ({ variantId }) {
  const getVariantData = () => {
    const isMatchedVariant = variantData => {
      return variantData.uuid === variantId
    }

    return store.state.player.variants.find(
      isMatchedVariant
    )
  }

  const getAudioDataArgs = () => {
    const variantData = getVariantData()
    const isBandcampVariant =
      variantData.audio.source_id === 'bandcamp'

    if (isBandcampVariant) {
      return fetchBandcampIdData({
        trackData: variantData
      })
    } else {
      return variantData.audio
    }
  }

  const audioDataArgs = {
    audioData: await getAudioDataArgs()
  }

  const handleSuccess = () => {
    updateStore({
      'player.currentVariantId': variantId
    })
  }

  return fetchAudioData(audioDataArgs)
    .then(handleSuccess)
}
