import React from 'react'
import Album from './albums/Album'
import { v4 as uuid } from 'uuid'
import { Grid, Header, Segment, Pagination } from 'semantic-ui-react'
import axios from 'axios'

export default class Albums extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      page: 1
    }
  }

  limit = 4

  componentDidMount () {
    this.getAlbums()
  }

  getAlbums () {
    this.setState({ loading: true })
    axios(this.albumsLink()).then(resp => this.setAlbumsData(resp))
  }

  albumsLink () {
    return {
      method: 'GET',
      url: `/lastfm/artists/${this.props.artistName}/albums`,
      params: {
        limit: this.limit,
        page: this.state.page
      }
    }
  }

  setAlbumsData (resp) {
    this.setState({
      albums: resp.data.artist.albums,
      totalPages: resp.data.artist.total_pages,
      loading: false
    })
  }

  albumsList () {
    return (
      <Grid>
        {this.state.albums.map(album => {
          return (
            <Grid.Column width={8} key={uuid()}>
              <Album album={album} />
            </Grid.Column>
          )
        })}
      </Grid>
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

  handlePageChange = (e, { activePage }) => {
    this.props.scrollToSegmentTop('artistPageAlbumsSegment')
    this.setState({ page: activePage }, this.getAlbums)
  }

  render () {
    return (
      <React.Fragment>
        <Header as="h3" attached="top" content="Top albums" />
        <Segment
          className="artistPageSegment"
          id="artistPageAlbumsSegment"
          loading={this.state.loading}
          attached
          content={this.state.albums && this.albumsList()}
        />

        <Segment className="artistPagePaginationWrap" attached="bottom">
          {this.state.albums && this.pagination()}
        </Segment>
      </React.Fragment>
    )
  }
}
