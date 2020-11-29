import React from 'react'
import { Segment, Dimmer, Loader } from 'semantic-ui-react'
import axios from 'axios'
import ErrorData from 'partials/ErrorData'
import Main from './data/Main'
import Extra from './data/Extra'
import 'styles/artists/tracks/Show.sass'

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
    const { artistName, trackTitle } = this.params()

    const prevParams = prevProps.match.params

    const artistNameChanged = artistName !== prevParams.artistName
    const trackTitleChanged = trackTitle !== prevParams.trackTitle
    const trackChanged = artistNameChanged || trackTitleChanged

    if (trackChanged) {
      this.setNavSections(artistName, trackTitle)
      this.getInfo()
    }
  }

  componentWillUnmount () {
    this._isMounted = false
    this.request.cancel()
  }

  params = () => this.props.match.params

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
      <Segment className="trackPage">
        <Main {...{ track }} />
        <Extra {...{ track }} />
      </Segment>
    )
  }

  render () {
    const { loading, track, error } = this.state

    const loaderData = loading && (
      <Dimmer active inverted className="fixed" content={<Loader inverted />} />
    )

    const trackData = track && this.trackData()

    const errorData = error && <ErrorData {...{ error }} />

    const contentData = loaderData || trackData || errorData

    return <React.Fragment>{contentData}</React.Fragment>
  }
}
