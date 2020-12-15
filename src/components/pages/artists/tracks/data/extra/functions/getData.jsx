import axios from 'axios'

export default function getData (page) {
  const startState = {
    error: null,
    responsePage: page || 1,
    isLoading: true
  }

  this.setState(startState)

  const url =
    `/lastfm/artists/${this.artistNameEncoded}` +
    `/tracks/${this.trackTitleEncoded}/${this.dataName}`

  const limit = this.requestPageLimit
  const params = { page, limit }
  const cancelToken = this.request.token
  const extra = { params, cancelToken }

  const finishState = { isLoading: false, isLoaded: true }

  const handleSuccess = resp => {
    const { track } = resp.data

    const data = track[this.dataName]
    const responseTotalPages = track.total_pages

    const successState = { data, responseTotalPages, ...finishState }

    this.setState(successState)

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
