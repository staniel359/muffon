import React from 'react'
import LeftColumn from './show/columns/Left'
import RightColumn from './show/columns/Right'
import ErrorMessage from 'partials/ErrorMessage'
import LoaderDimmer from 'partials/LoaderDimmer'
import axios from 'axios'
import 'styles/artists/Show.sass'

export default class Show extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { loading: false }
  }

  componentDidMount () {
    this._isMounted = true
    this.request = axios.CancelToken.source()

    this.setNavSections(this.params().artistName)
    this.setArtistName()
  }

  componentDidUpdate (prevProps, prevState) {
    this.handleArtistChange(prevProps)
  }

  componentWillUnmount () {
    this._isMounted = false
    this.request.cancel()
  }

  params = () => this.props.match.params

  handleArtistChange (prevProps) {
    const { artistName } = this.params()

    const prevArtistName = prevProps.match.params.artistName
    const artistChanged = artistName !== prevArtistName

    if (artistChanged) {
      this.setNavSections(artistName)
      this.setState({ artistName: null })
      this.setArtistName()
    }
  }

  setArtistName () {
    const switchLoader = loading => {
      this._isMounted && this.setState({ ...{ loading } })
    }

    switchLoader(true)

    const url = `/lastfm/artists/${this.params().artistName}`
    const cancelToken = this.request.token
    const extra = { ...{ cancelToken } }

    const handleSuccess = resp => {
      const artistName = resp.data.artist.name

      this.setState({ ...{ artistName } })
      this.setNavSections(artistName)
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

  setNavSections (artistName) {
    const navSections = [
      { content: 'Artists' },
      { content: artistName, active: true }
    ]

    this.props.setNavSections(navSections)
  }

  artistData () {
    const { artistName } = this.state

    const segmentTop = segmentID =>
      document.getElementById(segmentID).offsetTop - 60
    const scrollToSegmentTop = segmentID =>
      window.scrollTo(0, segmentTop(segmentID))

    const leftColumnProps = { artistName, scrollToSegmentTop, segmentTop }
    const rightColumnProps = { artistName, scrollToSegmentTop }

    return (
      <React.Fragment>
        <LeftColumn {...leftColumnProps} />
        <RightColumn {...rightColumnProps} />
      </React.Fragment>
    )
  }

  render () {
    const { error, loading, artistName } = this.state

    const artistData = artistName && this.artistData()

    const errorData = error && <ErrorMessage {...{ error }} />

    const loaderData = loading && <LoaderDimmer />

    const contentData = artistData || errorData || loaderData

    return <React.Fragment>{contentData}</React.Fragment>
  }
}
