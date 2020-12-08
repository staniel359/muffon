import axios from 'axios'

export default function getData (page) {
  this.setState({ isLoading: true })

  const { artistName, trackTitle } = this.params()

  const isTrackPage = this.dataName === 'track'
  const trackUrl = `/lastfm/artists/${artistName}/tracks/${trackTitle}`
  const url = isTrackPage ? trackUrl : trackUrl + `/${this.dataName}`

  const cancelToken = this.request.token
  const extra = { ...{ cancelToken } }

  const handleSuccess = resp => {
    const { track } = resp.data
    const { artist, title } = track

    const data = isTrackPage ? track : track[this.dataName]

    this.setState({ ...{ data } })

    this.setNavSections(artist, title)
  }

  const handleError = error => {
    !axios.isCancel(error) && this.setState({ ...{ error } })
  }

  const handleFinish = () => {
    if (this._isMounted) {
      this.setState({ isLoading: false, isLoaded: true })
    }
  }

  axios
    .get(url, extra)
    .then(handleSuccess)
    .catch(handleError)
    .then(handleFinish)
}
