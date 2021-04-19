import fetchVariantAudioData from '#/actions/audio/variant/fetchData'
import { raiseProductionError } from '#/utils'

export default function ({ index }) {
  this.isLoading = true
  this.error = null

  const variantAudioDataArgs = { index }

  const handleError = error => {
    this.error = error

    raiseProductionError(error)
  }

  const handleFinish = () => {
    this.isLoading = false
  }

  return fetchVariantAudioData(variantAudioDataArgs)
    .catch(handleError)
    .finally(handleFinish)
}
