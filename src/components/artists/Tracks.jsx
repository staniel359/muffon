import React from 'react'
import { v4 as uuid } from 'uuid'
import { Segment, Dimmer, Loader, List, Pagination } from 'semantic-ui-react'
import axios from 'axios'
import TrackContextWrap from 'global/artists/TrackContextWrap'
import ErrorData from 'partials/ErrorData'
import { HashRouter as Router } from 'react-router-dom'

export default class Tracks extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { loading: false, currentPage: 1 }
  }

  componentDidMount () {
    this._isMounted = true
    this.request = axios.CancelToken.source()

    this.setNavSections(this.params().artistName)
    this.getData()
  }

  componentDidUpdate (prevProps, prevState) {
    const { artistName } = this.params()

    const prevArtistName = prevProps.match.params.artistName
    const artistChanged = artistName !== prevArtistName

    if (artistChanged) {
      this.setNavSections(artistName)
      this.getData()
    }
  }

  componentWillUnmount () {
    this._isMounted = false
    this.request.cancel()
  }

  params = () => this.props.match.params

  setNavSections (artistName) {
    const artistNameEncoded = encodeURIComponent(artistName)
    const artistPageLink = `#/artists/${artistNameEncoded}`
    const navSections = [
      { key: uuid(), content: 'Artists' },
      { key: uuid(), content: artistName, href: artistPageLink },
      { key: uuid(), content: 'Tracks', active: true }
    ]

    this.props.setNavSections(navSections)
  }

  getData = page => {
    const switchLoader = loading => {
      this._isMounted && this.setState({ ...{ loading } })
    }

    switchLoader(true)

    const url = `/lastfm/artists/${this.params().artistName}/tracks`
    const limit = 50
    const params = { ...{ limit, page } }
    const cancelToken = this.request.token
    const extra = { ...{ params, cancelToken } }

    const handleSuccess = resp => {
      const { artist } = resp.data
      const { tracks } = artist

      const pageTopTrackCount =
        page > 1 ? this.state.topTrackCount : tracks[0].listeners_count
      const topTrackCount = tracks.length > 0 ? pageTopTrackCount : 0

      const artistName = artist.name
      const totalPages = artist.total_pages
      const error = null

      this.setState({ ...{ tracks, topTrackCount, artistName, totalPages, error } })

      this.setNavSections(artistName)

      window.scrollTo(0, 0)
    }

    const handleError = error => {
      const tracks = null

      !axios.isCancel(error) && this.setState({ ...{ error, tracks } })
    }

    axios
      .get(url, extra)
      .then(handleSuccess)
      .catch(handleError)
      .then(() => switchLoader(false))
  }

  tracksList () {
    const { tracks, loading, artistName, topTrackCount } = this.state

    const trackData = track => {
      const key = uuid()
      const trackProps = { track, artistName, topTrackCount, key }

      return <TrackContextWrap {...trackProps} />
    }
    const tracksList = tracks.map(trackData)

    const paginationData = tracks && this.pagination()

    return (
      <Segment.Group>
        <Segment className="artistPageSegment" {...{ loading }}>
          <Router>
            <List selection content={tracksList} />
          </Router>
        </Segment>

        <Segment className="artistPagePaginationWrap">{paginationData}</Segment>
      </Segment.Group>
    )
  }

  pagination () {
    const { totalPages } = this.state

    const handlePageChange = (_, { activePage }) => {
      this.setState({ currentPage: activePage })
      this.getData(activePage)
    }

    const paginationProps = {
      totalPages: totalPages,
      onPageChange: handlePageChange,
      firstItem: null,
      lastItem: null,
      siblingRange: 0
    }

    return <Pagination {...paginationProps} />
  }

  render () {
    const { loading, tracks, error } = this.state

    const tracksData = tracks && this.tracksList()

    const errorData = error && <ErrorData {...{ error }} />

    const loaderData = loading && (
      <Dimmer active inverted className="fixed" content={<Loader inverted />} />
    )

    const content = tracksData || errorData || loaderData

    return <React.Fragment>{content}</React.Fragment>
  }
}
