import React from 'react'
import { Header, Segment, Pagination } from 'semantic-ui-react'
import axios from 'axios'
import List from './albums/List'
import ErrorData from 'partials/ErrorData'

export default class Albums extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { loading: false, currentPage: 1 }
  }

  componentDidMount () {
    this._isMounted = true
    this.request = axios.CancelToken.source()

    this.getData()
  }

  componentWillUnmount () {
    this._isMounted = false
    this.request.cancel()
  }

  getData (page) {
    const switchLoader = loading => {
      this._isMounted && this.setState({ ...{ loading } })
    }

    switchLoader(true)

    const artistNameEncoded = encodeURIComponent(this.props.artistName)
    const url = `/lastfm/artists/${artistNameEncoded}/albums`
    const limit = 4
    const params = { ...{ limit, page } }
    const cancelToken = this.request.token
    const extra = { ...{ params, cancelToken } }

    const handleSuccess = resp => {
      const { artist } = resp.data

      this.setState({
        albums: artist.albums,
        totalPages: artist.total_pages,
        error: null
      })
    }

    const handleError = error => {
      !axios.isCancel(error) && this.setState({ error: error, albums: null })
    }

    axios
      .get(url, extra)
      .then(handleSuccess)
      .catch(handleError)
      .then(() => switchLoader(false))
  }

  pagination () {
    const { totalPages } = this.state
    const { scrollToSegmentTop } = this.props

    const handlePageChange = (_, { activePage }) => {
      scrollToSegmentTop('albums')

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
    const { loading, albums, error } = this.state
    const { artistName } = this.props

    const albumsDataProps = { albums, artistName }
    const albumsData = albums && <List {...albumsDataProps} />

    const errorData = error && <ErrorData {...{ error }} />

    const content = albumsData || errorData

    const paginationData = albums && this.pagination()

    return (
      <Segment.Group id="albums" className="artistPageSegmentWrap">
        <Segment>
          <Header as="h3" content="Top albums" />
        </Segment>

        <Segment className="artistPageSegment" {...{ loading, content }} />

        <Segment className="artistPagePaginationWrap">{paginationData}</Segment>
      </Segment.Group>
    )
  }
}
