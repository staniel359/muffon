import React from 'react'
import { Header, Segment, Pagination } from 'semantic-ui-react'
import axios from 'axios'
import List from './albums/List'

export default class Albums extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { loading: true, page: 1 }
  }

  componentDidMount () {
    this.getAlbums()
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.state.page !== prevState.page) {
      this.getAlbums()
    }
  }

  getAlbums () {
    this.setState({ loading: true })

    axios(this.albumsLink()).then(resp => this.setAlbumsData(resp))
  }

  albumsLink () {
    return {
      method: 'GET',
      url: `/lastfm/artists/${this.artistName}/albums`,
      params: { limit: 4, page: this.state.page }
    }
  }

  artistName = encodeURIComponent(this.props.artistName)

  setAlbumsData (resp) {
    const data = resp.data.artist
    this.setState({
      albums: data.albums,
      totalPages: data.total_pages,
      loading: false
    })
  }

  albumsList () {
    const { albums } = this.state
    const { artistName } = this.props

    return <List {...{ albums, artistName }} />
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
    this.props.scrollToSegmentTop('albums')

    this.setState({ page: activePage })
  }

  render () {
    return (
      <Segment.Group id="albums" className="artistPageSegmentWrap">
        <Segment>
          <Header as="h3" content="Top albums" />
        </Segment>

        <Segment
          className="artistPageSegment"
          loading={this.state.loading}
          content={this.state.albums && this.albumsList()}
        />

        <Segment className="artistPagePaginationWrap">
          {this.state.albums && this.pagination()}
        </Segment>
      </Segment.Group>
    )
  }
}
