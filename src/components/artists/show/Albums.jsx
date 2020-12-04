import React from 'react'
import { Header, Segment, Pagination, Divider } from 'semantic-ui-react'
import axios from 'axios'
import List from '../albums/List'
import ErrorMessage from 'partials/ErrorMessage'
import { Link } from 'react-router-dom'

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
    const limit = 3
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
      page && this.props.scrollToTop('albums')

      switchLoader(false)
    }

    axios
      .get(url, extra)
      .then(handleSuccess)
      .catch(handleError)
      .then(handleFinish)
  }

  albumsData () {
    const { albums } = this.state
    const { artistName } = this.props

    const itemsPerRow = 3
    const albumsDataProps = { albums, artistName, itemsPerRow }

    return (
      <React.Fragment>
        <List {...albumsDataProps} />

        <Divider />

        {this.pagination()}
      </React.Fragment>
    )
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
      <div className="paginationWrap">
        <Pagination {...paginationProps} />
      </div>
    )
  }

  render () {
    const { loading, albums, error } = this.state

    const albumsPageLink = `/artists/${this.artistNameEncoded}/albums`
    const albumsPageLinkData = <Link to={albumsPageLink}>Top albums</Link>
    const headerData = <Header as="h3" content={albumsPageLinkData} />

    const albumsData = albums && this.albumsData()

    const errorData = error && <ErrorMessage {...{ error }} />

    const contentData = albumsData || errorData

    return (
      <Segment.Group className="artistPageSegmentWrap">
        <Segment content={headerData} />
        <Segment
          className="artistPageSegment"
          content={contentData}
          {...{ loading }}
        />
      </Segment.Group>
    )
  }
}
