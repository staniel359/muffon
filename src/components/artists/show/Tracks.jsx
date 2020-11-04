import React from 'react'
import { Header, Segment, Pagination } from 'semantic-ui-react'
import axios from 'axios'
import List from './tracks/List'

export default class Tracks extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { loading: true, page: 1 }
  }

  componentDidMount () {
    this.getTracks()
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.state.page !== prevState.page) {
      this.getTracks()
    }
  }

  getTracks () {
    this.setState({ loading: true })

    axios(this.tracksLink()).then(resp => this.setTracksData(resp))
  }

  tracksLink () {
    return {
      method: 'GET',
      url: `/lastfm/artists/${this.artistName}/tracks`,
      params: { limit: 10, page: this.state.page }
    }
  }

  artistName = encodeURIComponent(this.props.artistName)

  setTracksData (resp) {
    const data = resp.data.artist

    this.setState({
      tracks: data.tracks,
      topTrackCount: data.tracks[0].listeners_count,
      totalPages: data.total_pages,
      loading: false
    })
  }

  tracksList () {
    const { tracks, topTrackCount } = this.state
    const { artistName } = this.props

    return <List {...{ tracks, topTrackCount, artistName }} />
  }

  pagination () {
    return (
      <Pagination
        defaultActivePage={this.state.page}
        totalPages={this.state.totalPages}
        onPageChange={this.handlePageChange}
        firstItem={null}
        lastItem={null}
        siblingRange={0}
      />
    )
  }

  handlePageChange = (_, { activePage }) => {
    this.props.scrollToSegmentTop('tracks')

    this.setState({ page: activePage })
  }

  render () {
    return (
      <div id="tracks" className="artistPageSegmentWrap">
        <Segment.Group>
          <Segment>
            <Header as="h3" content="Top tracks" />
          </Segment>

          <Segment
            className="artistPageSegment"
            loading={this.state.loading}
            content={this.state.tracks && this.tracksList()}
          />

          <Segment className="artistPagePaginationWrap">
            {this.state.tracks && this.pagination()}
          </Segment>
        </Segment.Group>
      </div>
    )
  }
}
