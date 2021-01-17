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
    const { tagName } = this.props

    const tagNameEncoded = encodeURIComponent(tagName)
    const baseUrl = `/lastfm/tags/${tagNameEncoded}`

    if (isSegment('info')) {
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

    const data = isSegment('info') ? tag : tag[this.dataName]

    const responseTotalPages = tag.total_pages

    const pageableState = isPageable && { responseTotalPages }

    const finishState = { isLoading: false, isLoaded: true }

    const successState = { data, ...pageableState, ...finishState }

    this.setState(successState)

    if (isSegment('artists')) {
      const { setArtistImages } = this.props

      const artistImages = data.map(a => a.images.small)

      setArtistImages(artistImages)
    }
  }

  const handleError = error => {
    const errorState = { error, isLoading: false }

    !axios.isCancel(error) && this.setState(errorState)
  }

  const scrollToTop = () => {
    const { scrollToTop } = this.props

    page && scrollToTop(this.dataName)
  }

  axios
    .get(url(), extra)
    .then(handleSuccess)
    .catch(handleError)
    .then(scrollToTop)
}
