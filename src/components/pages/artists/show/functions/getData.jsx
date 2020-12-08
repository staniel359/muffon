import axios from 'axios'

export default function getData (page) {
  this.setState({
    error: null,
    responseCurrentPage: page || 1,
    isLoading: true
  })

  const isInfoSegment = this.dataName === 'info'
  const artistUrl = `/lastfm/artists/${this.artistNameEncoded}`
  const url = isInfoSegment ? artistUrl : artistUrl + `/${this.dataName}`

  const limit = this.requestPageLimit
  const params = { ...{ limit, page } }
  const cancelToken = this.request.token
  const extra = { ...{ params, cancelToken } }

  const handleSuccess = resp => {
    const { artist } = resp.data

    const data = isInfoSegment ? artist : artist[this.dataName]
    const responseTotalPages = artist.total_pages

    this.setState({ ...{ data, responseTotalPages } })

    if (this.dataName === 'tracks') {
      const pageTopTrackCount =
        page > 1 ? this.state.topTrackCount : data[0].listeners_count
      const topTrackCount = data.length > 0 ? pageTopTrackCount : 0

      this.setState({ ...{ topTrackCount } })
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
