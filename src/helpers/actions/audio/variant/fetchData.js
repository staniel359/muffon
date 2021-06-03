import {
  getVariants as getPlayerVariants,
  setCurrentVariantIndex as setPlayerCurrentVariantIndex
} from '#/actions/player'
import fetchBandcampIdData from './id/bandcamp/fetchData'
import fetchAudioData from '#/actions/api/audio/fetchData'

export default async function ({ index }) {
  const variantData = getPlayerVariants()[index]

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
    setPlayerCurrentVariantIndex(index)
  }

  return fetchAudioData(audioDataArgs)
    .then(handleSuccess)
}
