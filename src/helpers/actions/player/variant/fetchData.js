import fetchVariantAudioData from '#/actions/audio/variant/fetchData'

export default function ({ variantId }) {
  this.error = null
  this.isLoading = true

  const variantAudioDataArgs = { variantId }

  const handleError = error => {
    this.error = error
  }

  const handleFinish = () => {
    this.isLoading = false
  }

  return fetchVariantAudioData(variantAudioDataArgs)
    .catch(handleError)
    .finally(handleFinish)
}
