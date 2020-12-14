import axios from 'axios'

export default function getData (page) {
  const startState = { isLoading: true }

  this.setState(startState)

  const { artistName, trackTitle } = this.params()

  const isTrackPage = this.dataName === 'track'
  const trackUrl = `/lastfm/artists/${artistName}/tracks/${trackTitle}`
  const url = isTrackPage ? trackUrl : trackUrl + `/${this.dataName}`

  const cancelToken = this.request.token
  const extra = { cancelToken }

  const finishState = { isLoading: false, isLoaded: true }

  const handleSuccess = resp => {
    const { track } = resp.data
    const { artist, title } = track

    const data = isTrackPage ? track : track[this.dataName]

    const successState = { data, ...finishState }

    this.setState(successState)

    this.setNavSections(artist, title)
  }

  const handleError = error => {
    const errorState = { error, ...finishState }

    !axios.isCancel(error) && this.setState(errorState)
  }

  axios.get(url, extra).then(handleSuccess).catch(handleError)
}
