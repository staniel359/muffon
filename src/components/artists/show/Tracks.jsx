import React from 'react'
import { Header, Segment, Pagination, Divider } from 'semantic-ui-react'
import axios from 'axios'
import List from './tracks/List'
import ErrorMessage from 'partials/ErrorMessage'
import { Link } from 'react-router-dom'

export default class Tracks extends React.PureComponent {
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

    const url = `/lastfm/artists/${this.artistNameEncoded}/tracks`
    const limit = 10
    const params = { ...{ limit, page } }
    const cancelToken = this.request.token
    const extra = { ...{ params, cancelToken } }

    const handleSuccess = resp => {
      const { artist } = resp.data
      const { tracks } = artist

      const pageTopTrackCount =
        page > 1 ? this.state.topTrackCount : tracks[0].listeners_count
      const topTrackCount = tracks.length > 0 ? pageTopTrackCount : 0

      const totalPages = artist.total_pages
      const error = null

      this.setState({ ...{ tracks, topTrackCount, totalPages, error } })
    }

    const handleError = error => {
      const tracks = null

      !axios.isCancel(error) && this.setState({ ...{ error, tracks } })
    }

    const handleFinish = () => {
      page && this.props.scrollToTop('tracks')

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
    const { loading, tracks, error, topTrackCount } = this.state
    const { artistName } = this.props

    const tracksPageLink = `/artists/${this.artistNameEncoded}/tracks`

    const tracksDataProps = { tracks, topTrackCount, artistName }
    const tracksData = tracks && <List {...tracksDataProps} />

    const errorData = error && <ErrorMessage {...{ error }} />

    const contentData = tracksData || errorData

    const paginationData = tracks && this.pagination()

    return (
      <Segment.Group className="artistPageSegmentWrap">
        <Segment>
          <Header as="h3">
            <Link to={tracksPageLink}>Top tracks</Link>
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
