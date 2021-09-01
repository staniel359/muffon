import axios from 'axios'
import { handleEnvError } from '#/utils'

export default function ({ artistName, isInteractive, limit }) {
  this.isLoading = true

  const artistNameEncoded = encodeURIComponent(artistName)
  const url = `/lastfm/artists/${artistNameEncoded}/images`

  const params = {}

  const handleSuccess = response => {
    const { images } = response.data.artist

    this.error = null

    const formatImages = () => {
      if (isInteractive) {
        if (limit) {
          return images.slice(0, limit)
        } else {
          return images
        }
      } else {
        return images.slice(0, 1)
      }
    }

    this.images = formatImages()
  }

  const handleError = error => {
    this.error = error
    this.images = null

    handleEnvError(error)
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
