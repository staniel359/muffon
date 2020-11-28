import React from 'react'
import { Header, Segment, Pagination, Divider } from 'semantic-ui-react'
import axios from 'axios'
import List from './albums/List'
import ErrorData from 'partials/ErrorData'
import { HashRouter as Router, Link } from 'react-router-dom'

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

  artistNameEncoded = encodeURIComponent(this.props.artistName)

  getData (page) {
    const switchLoader = loading => {
      this._isMounted && this.setState({ ...{ loading } })
    }

    switchLoader(true)

    const url = `/lastfm/artists/${this.artistNameEncoded}/albums`
    const limit = 4
    const params = { ...{ limit, page } }
    const cancelToken = this.request.token
    const extra = { ...{ params, cancelToken } }

    const handleSuccess = resp => {
      const { artist } = resp.data
      const { albums } = artist

      const totalPages = artist.total_pages
      const error = null

      this.setState({ ...{ albums, totalPages, error } })
    }

    const handleError = error => {
      const albums = null

      !axios.isCancel(error) && this.setState({ ...{ error, albums } })
    }

    const handleFinish = () => {
      page && this.props.scrollToSegmentTop('albums')

      switchLoader(false)
    }

    axios
      .get(url, extra)
      .then(handleSuccess)
      .catch(handleError)
      .then(handleFinish)
  }

  pagination () {
    const { totalPages, loading } = this.state

    const handlePageChange = (_, { activePage }) => {
      this.setState({ currentPage: activePage })
      this.getData(activePage)
    }

    const paginationProps = {
      totalPages: totalPages,
      onPageChange: handlePageChange,
      firstItem: null,
      lastItem: null,
      siblingRange: 0,
      disabled: loading
    }

    return (
      <div className="artistPagePaginationWrap">
        <Pagination {...paginationProps} />
      </div>
    )
  }

  render () {
    const { loading, albums, error } = this.state
    const { artistName } = this.props

    const albumsPageLink = `/artists/${this.artistNameEncoded}/albums`

    const itemsPerRow = 2
    const albumsDataProps = { albums, artistName, itemsPerRow }
    const albumsData = albums && <List {...albumsDataProps} />

    const errorData = error && <ErrorData {...{ error }} />

    const contentData = albumsData || errorData

    const paginationData = albums && this.pagination()

    return (
      <Segment.Group id="albums" className="artistPageSegmentWrap">
        <Segment>
          <Header as="h3">
            <Router>
              <Link to={albumsPageLink}>Top albums</Link>
            </Router>
          </Header>
        </Segment>

        <Segment className="artistPageSegment" {...{ loading }}>
          {contentData}

          <Divider />

          {paginationData}
        </Segment>
      </Segment.Group>
    )
  }
}
