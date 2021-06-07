import {
  getVariants as getPlayerVariants,
  setCurrentVariantId as setPlayerCurrentVariantId
} from '#/actions/player'
import fetchBandcampIdData from './id/bandcamp/fetchData'
import fetchAudioData from '#/actions/api/audio/fetchData'

export default async function ({ variantId }) {
  const getVariantData = () => {
    const matchedVariant = variantData => {
      return variantData.uuid === variantId
    }

    return getPlayerVariants().find(matchedVariant)
  }

  const variantData = getVariantData()

  const getAudioDataArgs = () => {
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
    setPlayerCurrentVariantId(variantId)
  }

  return fetchAudioData(audioDataArgs)
    .then(handleSuccess)
}
