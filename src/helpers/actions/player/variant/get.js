import getPlayerVariantAudio from '*/helpers/actions/player/variant/audio/get'

export default function ({ variantId }) {
  this.error = null
  this.isLoading = true

  const playerVariantAudioArgs = {
    variantId
  }

  const handleError = error => {
    this.error = error
  }

  const handleFinish = () => {
    this.isLoading = false
  }

  return getPlayerVariantAudio(
    playerVariantAudioArgs
  ).catch(
    handleError
  ).finally(
    handleFinish
  )
}
