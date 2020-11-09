import React from 'react'
import { Header, Segment, Pagination } from 'semantic-ui-react'
import axios from 'axios'
import List from './albums/List'
import ErrorData from 'partials/ErrorData'

export default class Albums extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { loading: true, page: 1 }
  }

  componentDidMount () {
    this.getAlbums()
  }

  componentDidUpdate (prevProps, prevState) {
    const pageChanged = this.state.page !== prevState.page

    pageChanged && this.getAlbums()
  }

  getAlbums () {
    this.switchLoader(true)

    const artistNameEncoded = encodeURIComponent(this.props.artistName)
    const url = `/lastfm/artists/${artistNameEncoded}/albums`
    const params = { limit: 4, page: this.state.page }

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

    this.setState({
      albums: artist.albums,
      totalPages: artist.total_pages,
      error: null
    })
  }

  handleError = error => {
    this.setState({ error: error, albums: null })
  }

  handlePageChange = (_, { activePage }) => {
    this.props.scrollToSegmentTop('albums')

    this.setState({ page: activePage })
  }

  render () {
    const { loading, albums, error, page, totalPages } = this.state
    const { artistName } = this.props

    const albumsList = albums && <List {...{ albums, artistName }} />
    const errorData = error && <ErrorData {...{ error }} />
    const albumsData = albumsList || errorData
    const paginationData = albums && (
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
      <Segment.Group id="albums" className="artistPageSegmentWrap">
        <Segment>
          <Header as="h3" content="Top albums" />
        </Segment>

        <Segment
          className="artistPageSegment"
          loading={loading}
          content={albumsData}
        />

        <Segment className="artistPagePaginationWrap">{paginationData}</Segment>
      </Segment.Group>
    )
  }
}
