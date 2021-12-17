import axios from 'axios'

export default function ({ artistName, isInteractive, limit }) {
  this.error = null
  this.isLoading = true

  const artistNameEncoded =
    encodeURIComponent(
      artistName
    )
  const url =
    `/lastfm/artists/${artistNameEncoded}/images`

  const handleSuccess = response => {
    const { images } =
      response.data.artist

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
  }

  const handleFinish = () => {
    this.isLoading = false
  }

  return axios.get(
    url
  ).then(
    handleSuccess
  ).catch(
    handleError
  ).finally(
    handleFinish
  )
}
