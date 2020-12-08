import axios from 'axios'

export default function getData (page) {
  const { query } = this.props

  this.setState({
    error: null,
    responseCurrentPage: page || 1,
    isLoading: true
  })

  const url = `lastfm/search/${this.dataName}`

  const limit = this.requestPageLimit
  const params = { ...{ query, limit, page } }
  const cancelToken = this.request.token
  const extra = { ...{ params, cancelToken } }

  const handleSuccess = resp => {
    const { search } = resp.data

    const data = search[this.dataName]
    const responseTotalPages = search.total_pages

    this.setState({ ...{ data, responseTotalPages } })
  }

  const handleError = error => {
    !axios.isCancel(error) && this.setState({ ...{ error } })
  }

  const handleFinish = () => {
    if (this._isMounted) {
      const { scrollToTop } = this.props

      this.setState({ isLoading: false, isLoaded: true })

      scrollToTop(this.dataName)
    }
  }

  axios
    .get(url, extra)
    .then(handleSuccess)
    .catch(handleError)
    .then(handleFinish)
}
