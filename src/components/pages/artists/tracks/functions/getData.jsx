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
    const { artistName, trackTitle } = this.props.match.params

    const baseUrl = `/lastfm/artists/${artistName}/tracks/${trackTitle}`

    if (isPage('track')) {
      return baseUrl
    } else {
      return `${baseUrl}/${this.dataName}`
    }
  }

  const params = { limit: this.clientPageLimit, page }
  const cancelToken = this.request.token
  const extra = { params, cancelToken }

  const handleSuccess = resp => {
    const { track } = resp.data

    const data = isPage('track') ? track : track[this.dataName]

    const responseTotalPages = track.total_pages

    const pageableState = isPageable && { responseTotalPages }

    const finishState = {
      track: {
        artist: track.artist,
        title: track.title
      },
      isLoading: false,
      isLoaded: true
    }

    const successState = { data, ...pageableState, ...finishState }

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
