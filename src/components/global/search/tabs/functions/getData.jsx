import axios from 'axios'

export default function getData (page) {
  const { query } = this.props

  const startState = {
    error: null,
    responsePage: page || 1,
    isLoading: true
  }

  this.setState(startState)

  const url = `lastfm/search/${this.dataName}`

  const limit = this.requestPageLimit
  const params = { query, limit, page }
  const cancelToken = this.request.token
  const extra = { params, cancelToken }

  const finishState = { isLoading: false, isLoaded: true }

  const handleSuccess = resp => {
    const { search } = resp.data

    const data = search[this.dataName]
    const responseTotalPages = search.total_pages

    const successState = { data, responseTotalPages, ...finishState }

    this.setState(successState)

    scrollToTop()
  }

  const scrollToTop = () => this.props.scrollToTop(this.dataName)

  const handleError = error => {
    const errorState = { error, ...finishState }

    !axios.isCancel(error) && this.setState(errorState)

    scrollToTop()
  }

  axios.get(url, extra).then(handleSuccess).catch(handleError)
}
