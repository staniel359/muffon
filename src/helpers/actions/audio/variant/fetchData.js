import {
  getVariants as getPlayerVariants,
  setCurrentVariantIndex as setPlayerCurrentVariantIndex
} from '#/actions/player'
import fetchBandcampIdData from '#/actions/api/id/bandcamp/fetchData'
import fetchAudioData from '#/actions/api/audio/fetchData'

export default async function ({ index }) {
  const variant = getPlayerVariants()[index]

  const getAudioDataArgs = async () => {
    const isBandcampVariant =
      variant.audio.source === 'bandcamp'

    if (isBandcampVariant) {
      const bandcampIdDataArgs = {
        model: 'track',
        artistName: variant.id_data.artist,
        title: variant.id_data.title
      }

      const idData = await fetchBandcampIdData(
        bandcampIdDataArgs
      )

      return {
        ...idData,
        source: 'bandcamp'
      }
    } else {
      return variant.audio
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
