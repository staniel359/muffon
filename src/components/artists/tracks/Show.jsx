import React from 'react'
import { Segment } from 'semantic-ui-react'
import axios from 'axios'
import ErrorMessage from 'global/ErrorMessage'
import LoaderDimmer from 'global/LoaderDimmer'
import Main from './data/Main'
import Extra from './data/Extra'

export default class Show extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { loading: false }
  }

  componentDidMount () {
    this._isMounted = true
    this.request = axios.CancelToken.source()

    const { artistName, trackTitle } = this.params()

    this.setNavSections(artistName, trackTitle)
    this.getInfo()
  }

  componentDidUpdate (prevProps, prevState) {
    this.handleTrackChange(prevProps)
  }

  componentWillUnmount () {
    this._isMounted = false
    this.request.cancel()
  }

  params = () => this.props.match.params

  handleTrackChange (prevProps) {
    const { artistName, trackTitle } = this.params()

    const prevArtistName = prevProps.match.params.artistName
    const artistNameChanged = artistName !== prevArtistName

    const prevTrackTitle = prevProps.match.params.trackTitle
    const trackTitleChanged = trackTitle !== prevTrackTitle

    const trackChanged = artistNameChanged || trackTitleChanged

    if (trackChanged) {
      this.setNavSections(artistName, trackTitle)
      this.setState({ track: null })
      this.getInfo()
    }
  }

  getInfo () {
    const switchLoader = loading => {
      this._isMounted && this.setState({ ...{ loading } })
    }

    switchLoader(true)

    const { artistName, trackTitle } = this.params()

    const url = `/lastfm/artists/${artistName}/tracks/${trackTitle}`
    const cancelToken = this.request.token
    const extra = { ...{ cancelToken } }

    const handleSuccess = resp => {
      const { track } = resp.data

      this.setState({ ...{ track } })
      this.setNavSections(track.artist, track.title)
    }

    const handleError = error => {
      !axios.isCancel(error) && this.setState({ ...{ error } })
    }

    const handleFinish = () => switchLoader(false)

    axios
      .get(url, extra)
      .then(handleSuccess)
      .catch(handleError)
      .then(handleFinish)
  }

  setNavSections (artistName, trackTitle) {
    const artistNameEncoded = encodeURIComponent(artistName)
    const artistPageLink = `#/artists/${artistNameEncoded}`
    const tracksPageLink = `#/artists/${artistNameEncoded}/tracks`
    const navSections = [
      { content: 'Artists' },
      { content: artistName, href: artistPageLink },
      { content: 'Tracks', href: tracksPageLink },
      { content: trackTitle, active: true }
    ]

    this.props.setNavSections(navSections)
  }

  trackData () {
    const { track } = this.state

    return (
      <Segment className="pageSegment">
        <Main {...{ track }} />
        <Extra {...{ track }} />
      </Segment>
    )
  }

  render () {
    const { loading, track, error } = this.state

    const trackData = track && this.trackData()

    const errorData = error && <ErrorMessage {...{ error }} />

    const loaderData = loading && <LoaderDimmer />

    const contentData = trackData || errorData || loaderData

    return <React.Fragment>{contentData}</React.Fragment>
  }
}
