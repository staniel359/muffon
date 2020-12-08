import axios from 'axios'

export default function getData (page) {
  this.setState({
    error: null,
    responseCurrentPage: page || 1,
    isLoading: true
  })

  const isArtistPage = this.dataName === 'artist'
  const artistUrl = `/lastfm/artists/${this.params().artistName}`
  const url = isArtistPage ? artistUrl : artistUrl + `/${this.dataName}`

  const limit = this.requestPageLimit
  const params = { ...{ limit, page } }
  const cancelToken = this.request.token
  const extra = { ...{ params, cancelToken } }

  const handleSuccess = resp => {
    const { artist } = resp.data

    const artistName = artist.name

    const data = isArtistPage ? {} : artist[this.dataName]
    const responseTotalPages = artist.total_pages

    this.setState({ ...{ artistName, data, responseTotalPages } })

    if (this.dataName === 'tracks') {
      const pageTopTrackCount =
        page > 1 ? this.state.topTrackCount : data[0].listeners_count
      const topTrackCount = data.length > 0 ? pageTopTrackCount : 0

      this.setState({ ...{ topTrackCount } })
    }

    this.setNavSections(artistName)
  }

  const handleError = error => {
    !axios.isCancel(error) && this.setState({ ...{ error } })
  }

  const handleFinish = () => {
    if (this._isMounted) {
      this.setState({ isLoading: false, isLoaded: true })

      window.scrollTo(0, 0)
    }
  }

  axios
    .get(url, extra)
    .then(handleSuccess)
    .catch(handleError)
    .then(handleFinish)
}
