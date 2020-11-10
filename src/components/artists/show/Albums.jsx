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
    const switchLoader = bool => this.setState({ loading: !!bool })

    switchLoader(true)

    const artistNameEncoded = encodeURIComponent(this.props.artistName)
    const url = `/lastfm/artists/${artistNameEncoded}/albums`
    const params = { params: { limit: 4, page: this.state.page } }

    const handleSuccess = resp => {
      const { artist } = resp.data

      this.setState({
        albums: artist.albums,
        totalPages: artist.total_pages,
        error: null
      })
    }
    const handleError = error => {
      this.setState({ error: error, albums: null })
    }

    axios
      .get(url, params)
      .then(handleSuccess)
      .catch(handleError)
      .then(switchLoader)
  }

  render () {
    const { loading, albums, error, page, totalPages } = this.state
    const { artistName, scrollToSegmentTop } = this.props

    const albumsListProps = { albums, artistName }
    const albumsList = albums && <List {...albumsListProps} />
    const errorData = error && <ErrorData {...{ error }} />
    const albumsData = albumsList || errorData

    const handlePageChange = (_, { activePage }) => {
      scrollToSegmentTop('albums')
      this.setState({ page: activePage })
    }
    const paginationProps = {
      defaultActivePage: page,
      totalPages: totalPages,
      onPageChange: handlePageChange,
      firstItem: null,
      lastItem: null,
      siblingRange: 0
    }
    const paginationData = albums && <Pagination {...paginationProps} />

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
