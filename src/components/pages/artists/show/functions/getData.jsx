import axios from 'axios'

export default function getData (page) {
  const startState = {
    error: null,
    responsePage: page || 1,
    isLoading: true
  }

  this.setState(startState)

  const isInfoSegment = this.dataName === 'info'
  const artistUrl = `/lastfm/artists/${this.artistNameEncoded}`
  const url = isInfoSegment ? artistUrl : artistUrl + `/${this.dataName}`

  const limit = this.requestPageLimit
  const params = { ...{ limit, page } }
  const cancelToken = this.request.token
  const extra = { ...{ params, cancelToken } }

  const finishState = { isLoading: false, isLoaded: true }

  const handleSuccess = resp => {
    const { artist } = resp.data

    const data = isInfoSegment ? artist : artist[this.dataName]
    const responseTotalPages = artist.total_pages

    const successState = {
      data,
      responseTotalPages,
      ...finishState
    }

    this.setState(successState)

    if (this.dataName === 'tracks') {
      const pageTopTrackCount =
        page > 1 ? this.state.topTrackCount : data[0].listeners_count
      const topTrackCount = data.length > 0 ? pageTopTrackCount : 0

      this.setState({ ...{ topTrackCount } })
    }

    scrollToTop()
  }

  const scrollToTop = () => page && this.props.scrollToTop(this.dataName)

  const handleError = error => {
    const errorState = { error, ...finishState }

    !axios.isCancel(error) && this.setState(errorState)

    scrollToTop()
  }

  axios.get(url, extra).then(handleSuccess).catch(handleError)
}
