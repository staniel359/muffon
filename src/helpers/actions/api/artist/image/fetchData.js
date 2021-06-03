import axios from 'axios'
import { raiseProductionError } from '#/utils'

export default function ({ artistName, isInteractive }) {
  this.isLoading = true

  const artistNameEncoded = encodeURIComponent(artistName)
  const url = `/lastfm/artists/${artistNameEncoded}/images`

  const params = {}

  const handleSuccess = response => {
    const { images } = response.data.artist

    this.error = null

    const formatImages = () => {
      if (isInteractive) {
        return images
      } else {
        return images.slice(0, 1)
      }
    }

    this.images = formatImages()
  }

  const handleError = error => {
    this.error = error
    this.images = null

    raiseProductionError(error)
  }

  const handleFinish = () => {
    this.isLoading = false
  }

  return axios
    .get(url, { params })
    .then(handleSuccess)
    .catch(handleError)
    .finally(handleFinish)
}
