import axios from 'axios'

export default function getData (page) {
  this.setState({
    error: null,
    responseCurrentPage: page || 1,
    isLoading: true
  })

  const isInfoSegment = this.dataName === 'info'
  const tagNameEncoded = encodeURIComponent(this.props.tagName)
  const tagUrl = `/lastfm/tags/${tagNameEncoded}`
  const url = isInfoSegment ? tagUrl : tagUrl + `/${this.dataName}`

  const params = { ...{ page } }
  const cancelToken = this.request.token
  const extra = { ...{ params, cancelToken } }

  const handleSuccess = resp => {
    const { tag } = resp.data

    const data = isInfoSegment ? tag : tag[this.dataName]
    const responseTotalPages = tag.total_pages

    this.setState({ ...{ data, responseTotalPages } })

    if (this.dataName === 'artists') {
      const { setArtistImages } = this.props

      const artistImages = data.map(a => a.images.small)

      setArtistImages(artistImages)
    }
  }

  const handleError = error => {
    !axios.isCancel(error) && this.setState({ ...{ error } })
  }

  const handleFinish = () => {
    if (this._isMounted) {
      const { isLoaded } = this.state
      const { scrollToTop } = this.props

      isLoaded && scrollToTop(this.dataName)

      this.setState({ isLoading: false, isLoaded: true })
    }
  }

  axios
    .get(url, extra)
    .then(handleSuccess)
    .catch(handleError)
    .then(handleFinish)
}
