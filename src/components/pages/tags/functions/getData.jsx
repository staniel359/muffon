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
    const { tagName } = this.props.match.params

    const baseUrl = `/lastfm/tags/${tagName}`

    if (isPage('tag')) {
      return baseUrl
    } else {
      return `${baseUrl}/${this.dataName}`
    }
  }

  const params = { page }
  const cancelToken = this.request.token
  const extra = { params, cancelToken }

  const handleSuccess = resp => {
    const { tag } = resp.data

    const data = tag[this.dataName]

    const responseTotalPages = tag.total_pages

    const pageableState = isPageable && { data, responseTotalPages }

    const finishState = {
      tag: { name: tag.name },
      isLoaded: true,
      isLoading: false
    }

    const successState = { ...pageableState, ...finishState }

    this.setState(successState)
  }

  const handleError = error => {
    const errorState = { error, isLoading: false }

    !axios.isCancel(error) && this.setState(errorState)
  }

  axios.get(url(), extra).then(handleSuccess).catch(handleError)
}
