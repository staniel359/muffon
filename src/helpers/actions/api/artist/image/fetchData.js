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
    this.images = isInteractive ? images : images.slice(0, 1)
  }

  const handleError = error => {
    this.error = error

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
