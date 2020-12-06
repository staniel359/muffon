import React from 'react'
import axios from 'axios'
import ErrorMessage from 'global/ErrorMessage'
import LoaderDimmer from 'global/LoaderDimmer'
import { Segment } from 'semantic-ui-react'
import Tags from 'global/Tags'

export default class TrackTags extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { isLoading: false }
  }

  componentDidMount () {
    this._isMounted = true
    this.request = axios.CancelToken.source()

    const { artistName, trackTitle } = this.params()

    this.setNavSections(artistName, trackTitle)
    this.getData()
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
    const isArtistNameChanged = artistName !== prevArtistName

    const prevTrackTitle = prevProps.match.params.trackTitle
    const isTrackTitleChanged = trackTitle !== prevTrackTitle

    const isTrackChanged = isArtistNameChanged || isTrackTitleChanged

    if (isTrackChanged) {
      this.setNavSections(artistName, trackTitle)
      this.setState({ tags: null })
      this.getData()
    }
  }

  setNavSections (artistName, trackTitle) {
    const artistNameEncoded = encodeURIComponent(artistName)
    const trackTitleEncoded = encodeURIComponent(trackTitle)

    const artistPageLink = `#/artists/${artistNameEncoded}`
    const tracksPageLink = `#/artists/${artistNameEncoded}/tracks`
    const trackPageLink = `#/artists/${artistNameEncoded}/tracks/${trackTitleEncoded}`

    const navSections = [
      { content: 'Artists' },
      { content: decodeURIComponent(artistName), href: artistPageLink },
      { content: 'Tracks', href: tracksPageLink },
      { content: decodeURIComponent(trackTitle), href: trackPageLink },
      { content: 'Tags', active: true }
    ]

    this.props.setNavSections(navSections)
  }

  getData = page => {
    const switchLoader = isLoading => {
      this._isMounted && this.setState({ ...{ isLoading } })
    }

    switchLoader(true)

    const { artistName, trackTitle } = this.params()

    const url = `/lastfm/artists/${artistName}/tracks/${trackTitle}/tags`
    const cancelToken = this.request.token
    const extra = { ...{ cancelToken } }

    const handleSuccess = resp => {
      const { track } = resp.data
      const { tags } = track

      const error = null

      this.setState({ ...{ tags, error } })

      this.setNavSections(track.artist, track.title)
    }

    const handleError = error => {
      const tags = null

      !axios.isCancel(error) && this.setState({ ...{ error, tags } })
    }

    const handleFinish = () => switchLoader(false)

    axios
      .get(url, extra)
      .then(handleSuccess)
      .catch(handleError)
      .then(handleFinish)
  }

  tagsData () {
    const { tags, isLoading } = this.state

    return (
      <Segment className="pageSegment" loading={isLoading}>
        <Tags {...{ tags }} />
      </Segment>
    )
  }

  render () {
    const { isLoading, tags, error } = this.state

    const tagsData = tags && this.tagsData()

    const errorData = error && <ErrorMessage {...{ error }} />

    const loaderData = isLoading && <LoaderDimmer />

    const contentData = tagsData || errorData || loaderData

    return <React.Fragment>{contentData}</React.Fragment>
  }
}
