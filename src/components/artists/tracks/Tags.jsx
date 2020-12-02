import React from 'react'
import axios from 'axios'
import ErrorData from 'partials/ErrorData'
import LoaderDimmer from 'partials/LoaderDimmer'
import { Segment, Label } from 'semantic-ui-react'
import { v4 as uuid } from 'uuid'
import { Link } from 'react-router-dom'
import 'styles/artists/tags/Show.sass'

export default class Tags extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { loading: false }
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
    const artistNameChanged = artistName !== prevArtistName

    const prevTrackTitle = prevProps.match.params.trackTitle
    const trackTitleChanged = trackTitle !== prevTrackTitle

    const trackChanged = artistNameChanged || trackTitleChanged

    if (trackChanged) {
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
      { content: artistName, href: artistPageLink },
      { content: 'Tracks', href: tracksPageLink },
      { content: trackTitle, href: trackPageLink },
      { content: 'Tags', active: true }
    ]

    this.props.setNavSections(navSections)
  }

  getData = page => {
    const switchLoader = loading => {
      this._isMounted && this.setState({ ...{ loading } })
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

  tagsList () {
    const { tags, loading } = this.state

    const tagData = tag => (
      <Label key={uuid()} as={Link} to={`/tags/${tag.name}`}>
        {tag.name}
        <Label.Detail content={`${tag.percent}%`} />
      </Label>
    )
    const tagsListData = tags.map(tagData)
    const tagsData = <Label.Group size="large">{tagsListData}</Label.Group>

    return (
      <Segment className="tagsPage" {...{ loading }}>
        {tagsData}
      </Segment>
    )
  }

  render () {
    const { loading, tags, error } = this.state

    const tagsData = tags && this.tagsList()

    const errorData = error && <ErrorData {...{ error }} />

    const loaderData = loading && <LoaderDimmer />

    const contentData = tagsData || errorData || loaderData

    return <React.Fragment>{contentData}</React.Fragment>
  }
}
