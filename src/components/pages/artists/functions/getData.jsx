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

  const isPage = pageName => this.dataName === pageName

  const url = () => {
    const { artistName } = this.props.match.params

    const baseUrl = `/lastfm/artists/${artistName}`

    if (isPage('artist')) {
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

    const data = artist[this.dataName]

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

    const trackPageState = isPage('tracks') && {
      topTrackCount: topTrackCount()
    }

    const pageableState = isPageable && {
      responseTotalPages,
      ...trackPageState
    }

    const defaultState = !isPage('artist') && {
      data,
      ...pageableState
    }

    const finishState = {
      artist: { name: artist.name },
      isLoaded: true,
      isLoading: false
    }

    const successState = { ...defaultState, ...finishState }

    this.setState(successState)
  }

  const handleError = error => {
    const errorState = { error, isLoading: false }

    !axios.isCancel(error) && this.setState(errorState)
  }

  const scrollToTop = () => window.scrollTo(0, 0)

  axios
    .get(url(), extra)
    .then(handleSuccess)
    .catch(handleError)
    .then(scrollToTop)
}
