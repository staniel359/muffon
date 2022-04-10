import axios from 'axios'

export default function ({ artistName }) {
  this.error = null
  this.isLoading = true

  const artistNameEncoded =
    encodeURIComponent(
      artistName
    )
  const url =
    `/lastfm/artists/${artistNameEncoded}/images`

  const handleSuccess = response => {
    const { image, images } =
      response.data.artist

    this.image = image

    this.images =
      images.slice(0, 20)
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
