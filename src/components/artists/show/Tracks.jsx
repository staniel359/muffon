import React from 'react'
import { Header, Segment, Pagination } from 'semantic-ui-react'
import axios from 'axios'
import List from './tracks/List'
import ErrorData from 'partials/ErrorData'

export default class Tracks extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { loading: true, page: 1 }
  }

  componentDidMount () {
    this.getTracks()
  }

  componentDidUpdate (prevProps, prevState) {
    const pageChanged = this.state.page !== prevState.page

    pageChanged && this.getTracks()
  }

  getTracks () {
    this.switchLoader(true)

    const artistNameEncoded = encodeURIComponent(this.props.artistName)
    const url = `/lastfm/artists/${artistNameEncoded}/tracks`
    const params = { limit: 10, page: this.state.page }

    axios
      .get(url, { params: params })
      .then(this.handleSuccess)
      .catch(this.handleError)
      .then(this.switchLoader)
  }

  switchLoader = bool => {
    this.setState({ loading: !!bool })
  }

  handleSuccess = resp => {
    const { artist } = resp.data

    const firstTrack = artist.tracks[0]
    const topTrackCount = this.state.topTrackCount || firstTrack.listeners_count

    this.setState({
      tracks: artist.tracks,
      topTrackCount: topTrackCount,
      totalPages: artist.total_pages,
      error: null
    })
  }

  handleError = error => {
    this.setState({ error: error, tracks: null })
  }

  handlePageChange = (_, { activePage }) => {
    this.props.scrollToSegmentTop('tracks')

    this.setState({ page: activePage })
  }

  render () {
    const {
      loading,
      tracks,
      error,
      topTrackCount,
      page,
      totalPages
    } = this.state
    const { artistName } = this.props

    const tracksList = tracks && (
      <List {...{ tracks, topTrackCount, artistName }} />
    )
    const errorData = error && <ErrorData {...{ error }} />
    const tracksData = tracksList || errorData
    const paginationData = tracks && (
      <Pagination
        defaultActivePage={page}
        totalPages={totalPages}
        onPageChange={this.handlePageChange}
        firstItem={null}
        lastItem={null}
        siblingRange={0}
      />
    )

    return (
      <Segment.Group id="tracks" className="artistPageSegmentWrap">
        <Segment>
          <Header as="h3" content="Top tracks" />
        </Segment>

        <Segment
          className="artistPageSegment"
          loading={loading}
          content={tracksData}
        />

        <Segment className="artistPagePaginationWrap">{paginationData}</Segment>
      </Segment.Group>
    )
  }
}
