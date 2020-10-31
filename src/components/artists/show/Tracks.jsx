import React from 'react'
import Track from './tracks/Track'
import { v4 as uuid } from 'uuid'
import { List, Header, Segment, Pagination } from 'semantic-ui-react'
import axios from 'axios'
import { HashRouter as Router } from 'react-router-dom'

export default class Tracks extends React.Component {
  shouldComponentUpdate (nextProps, nextState) {
    return nextState !== this.state
  }

  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      page: 1
    }
  }

  limit = 10
  artistName = encodeURIComponent(this.props.artistName)

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
      url: `/lastfm/artists/${this.artistName}/tracks`,
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
      <Router>
        <List selection>
          {this.state.tracks.map(track => {
            return (
              <Track
                key={uuid()}
                track={track}
                artistName={this.artistName}
                topTrackListenersCount={this.state.topTrackListenersCount}
              />
            )
          })}
        </List>
      </Router>
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
    this.props.scrollToSegmentTop('tracks')
    this.setState({ page: activePage }, this.getTracks)
  }

  render () {
    return (
      <div id="tracks" className="artistPageSegmentWrap">
        <Header as="h3" attached="top" content="Top tracks" />

        <Segment
          className="artistPageSegment"
          loading={this.state.loading}
          attached
          content={this.state.tracks && this.tracksList()}
        />

        <Segment attached="bottom" className="artistPagePaginationWrap">
          {this.state.tracks && this.pagination()}
        </Segment>
      </div>
    )
  }
}
