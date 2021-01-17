import axios from 'axios'

export default function getData (page) {
  const { isPageable } = this.state

  this.request = axios.CancelToken.source()

  const responsePage = page || 1
  const pageableState = isPageable && { responsePage }

  const startState = {
    error: null,
    isLoading: true,
    ...pageableState
  }

  this.setState(startState)

  const isSegment = segmentName => this.dataName === segmentName

  const url = () => {
    const { artistName } = this.props

    const artistNameEncoded = encodeURIComponent(artistName)
    const baseUrl = `/lastfm/artists/${artistNameEncoded}`

    if (isSegment('info')) {
      return baseUrl
    } else {
      return `${baseUrl}/${this.dataName}`
    }
  }

  const params = { limit: this.requestPageLimit, page }
  const cancelToken = this.request.token
  const extra = { params, cancelToken }

  const handleSuccess = resp => {
    const { artist } = resp.data

    const data = isSegment('info') ? artist : artist[this.dataName]

    const responseTotalPages = artist.total_pages

    const topTrackCount = () => {
      if (data.length > 0) {
        if (responsePage === 1) {
          return data[0].listeners_count
        } else {
          return this.state.topTrackCount
        }
      }
    }

    const trackState = isSegment('tracks') && {
      topTrackCount: topTrackCount()
    }

    const pageableState = isPageable && {
      responseTotalPages,
      ...trackState
    }

    const finishState = { isLoading: false, isLoaded: true }

    const successState = { data, ...pageableState, ...finishState }

    this.setState(successState)
  }

  const handleError = error => {
    const errorState = { error, isLoading: false }

    !axios.isCancel(error) && this.setState(errorState)
  }

  const scrollToTop = () => {
    const { scrollToTop } = this.props

    !!page && scrollToTop(this.dataName)
  }

  axios
    .get(url(), extra)
    .then(handleSuccess)
    .catch(handleError)
    .then(scrollToTop)
}
