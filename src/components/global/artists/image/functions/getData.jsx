import axios from 'axios'

export default function getData () {
  const { artistName, dimmer } = this.props

  this.setState({ isLoading: true })

  const artistNameEncoded = encodeURIComponent(artistName)
  const url = `/lastfm/artists/${artistNameEncoded}/images`

  const cancelToken = this.request.token
  const extra = { cancelToken }

  const handleSuccess = resp => {
    const { images } = resp.data.artist

    const imagesData = dimmer ? images : images.slice(0, 1)
    const successState = { images: imagesData, isLoading: false }

    this.setState(successState)
  }

  const handleError = error => {
    const errorState = { error, images: null, isLoading: false }

    !axios.isCancel(error) && this.setState(errorState)
  }

  axios.get(url, extra).then(handleSuccess).catch(handleError)
}
