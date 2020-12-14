import axios from 'axios'

export default function getData (page) {
  const startState = {
    error: null,
    responsePage: page || 1,
    isLoading: true
  }

  this.setState(startState)

  const isInfoSegment = this.dataName === 'info'
  const tagUrl = `/lastfm/tags/${this.tagNameEncoded}`
  const url = isInfoSegment ? tagUrl : tagUrl + `/${this.dataName}`

  const params = { page }
  const cancelToken = this.request.token
  const extra = { params, cancelToken }

  const finishState = { isLoading: false, isLoaded: true }

  const handleSuccess = resp => {
    const { tag } = resp.data

    const data = isInfoSegment ? tag : tag[this.dataName]
    const responseTotalPages = tag.total_pages

    const successState = { data, responseTotalPages, ...finishState }

    this.setState(successState)

    if (this.dataName === 'artists') {
      const { setArtistImages } = this.props

      const artistImages = data.map(a => a.images.small)

      setArtistImages(artistImages)
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
