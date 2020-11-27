import React from 'react'
import { v4 as uuid } from 'uuid'
import { Segment, Dimmer, Loader, List, Pagination } from 'semantic-ui-react'
import axios from 'axios'
import TrackContextWrap from 'global/artists/TrackContextWrap'
import ErrorData from 'partials/ErrorData'

export default class Tracks extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { loading: false, currentPage: 1 }
  }

  componentDidMount () {
    this._isMounted = true
    this.request = axios.CancelToken.source()

    this.getData()
  }

  componentDidUpdate (prevProps, prevState) {
    const artistName = props => props.match.params.artistName

    const artistChanged = artistName(this.props) !== artistName(prevProps)

    artistChanged && this.getData()
  }

  componentWillUnmount () {
    this._isMounted = false
    this.request.cancel()
  }

  getData = page => {
    const artistNameEncoded = this.props.match.params.artistName

    this.setNavSections(decodeURIComponent(artistNameEncoded))

    const switchLoader = loading => {
      this._isMounted && this.setState({ ...{ loading } })
    }

    switchLoader(true)

    const url = `/lastfm/artists/${artistNameEncoded}/tracks`
    const limit = 50
    const params = { ...{ limit, page } }
    const cancelToken = this.request.token
    const extra = { ...{ params, cancelToken } }

    const handleSuccess = resp => {
      const { artist } = resp.data

      const firstTrackCount = artist.tracks[0].listeners_count
      const topTrackCount = page ? this.state.topTrackCount : firstTrackCount

      this.setState({
        tracks: artist.tracks,
        topTrackCount: topTrackCount,
        totalPages: artist.total_pages,
        error: null
      })

      this.setNavSections(artist.name)

      window.scrollTo(0, 0)
    }

    const handleError = error => {
      !axios.isCancel(error) && this.setState({ error: error, tracks: null })
    }

    axios
      .get(url, extra)
      .then(handleSuccess)
      .catch(handleError)
      .then(() => switchLoader(false))
  }

  setNavSections (artistName) {
    const artistPageLink = `#/artists/${encodeURIComponent(artistName)}`
    const navSections = [
      { key: uuid(), content: 'Artists' },
      { key: uuid(), content: artistName, href: artistPageLink },
      { key: uuid(), content: 'Tracks', active: true }
    ]

    this.props.setNavSections(navSections)
  }

  tracksList () {
    const { tracks, loading, topTrackCount } = this.state

    const trackData = track => {
      const artistName = decodeURIComponent(this.props.match.params.artistName)
      const key = uuid()
      const trackProps = { track, artistName, topTrackCount, key }

      return <TrackContextWrap {...trackProps} />
    }
    const tracksList = tracks.map(trackData)

    const paginationData = tracks && this.pagination()

    return (
      <Segment.Group>
        <Segment {...{ loading }}>
          <List selection content={tracksList} />
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
