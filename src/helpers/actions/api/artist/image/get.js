import axios from 'axios'

export default function (
  {
    artistName
  }
) {
  this.error = null
  this.isLoading = true

  const artistNameEncoded =
    encodeURIComponent(
      artistName
    )
  const url =
    `/lastfm/artists/${artistNameEncoded}/image`

  const handleSuccess = (
    response
  ) => {
    const {
      image
    } = response.data.artist

    this.image = image
  }

  const handleError = (
    error
  ) => {
    this.error = error
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
