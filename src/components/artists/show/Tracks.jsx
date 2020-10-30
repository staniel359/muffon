import React from 'react'
import Track from './tracks/Track'
import { v4 as uuid } from 'uuid'
import { List, Header, Segment, Pagination } from 'semantic-ui-react'
import axios from 'axios'

export default class Tracks extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      page: 1
    }
  }

  limit = 10

  componentDidMount () {
    this.getTracks()
  }

  getTracks () {
    this.setState({ loading: true })
    axios(this.tracksLink()).then(resp => this.setTracksData(resp))
  }

  tracksLink () {
    return {
      method: 'GET',
      url: `/lastfm/artists/${this.props.artistName}/tracks`,
      params: {
        limit: this.limit,
        page: this.state.page
      }
    }
  }

  setTracksData (resp) {
    this.setState({
      tracks: resp.data.artist.tracks,
      topTrackListenersCount: resp.data.artist.tracks[0].listeners_count,
      totalPages: resp.data.artist.total_pages,
      loading: false
    })
  }

  tracksList () {
    return (
      <List selection>
        {this.state.tracks.map(track => {
          return (
            <Track
              key={uuid()}
              track={track}
              topTrackListenersCount={this.state.topTrackListenersCount}
            />
          )
        })}
      </List>
    )
  }

  pagination () {
    return (
      <Pagination
        defaultActivePage={this.state.page}
        totalPages={this.state.totalPages}
        firstItem={null}
        lastItem={null}
        siblingRange={0}
        onPageChange={this.handlePageChange}
      />
    )
  }

  handlePageChange = (_, { activePage }) => {
    this.props.scrollToSegmentTop('artistPageTracksSegment')
    this.setState({ page: activePage }, this.getTracks)
  }

  render () {
    return (
      <React.Fragment>
        <Header as="h3" attached="top" content="Top tracks" />

        <Segment
          className="artistPageSegment"
          id="artistPageTracksSegment"
          loading={this.state.loading}
          attached
          content={this.state.tracks && this.tracksList()}
        />

        <Segment attached="bottom" className="artistPagePaginationWrap">
          {this.state.tracks && this.pagination()}
        </Segment>
      </React.Fragment>
    )
  }
}
