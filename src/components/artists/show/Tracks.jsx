import React from 'react'
import { Header, Segment, Divider } from 'semantic-ui-react'
import axios from 'axios'
import List from './tracks/List'
import ErrorMessage from 'global/ErrorMessage'
import { Link } from 'react-router-dom'
import Pagination from 'global/Pagination'

export default class Tracks extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { isLoading: false, currentPage: 1 }
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

  getData = page => {
    const switchLoader = isLoading => {
      this._isMounted && this.setState({ ...{ isLoading } })
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

  tracksData () {
    const { tracks, topTrackCount, totalPages, isLoading } = this.state
    const { artistName } = this.props

    const tracksDataProps = { tracks, topTrackCount, artistName }

    const handlePageChange = this.getData
    const paginationProps = { totalPages, isLoading, handlePageChange }

    return (
      <React.Fragment>
        <List {...tracksDataProps} />

        <Divider />

        <Pagination {...paginationProps} />
      </React.Fragment>
    )
  }

  render () {
    const { isLoading, tracks, error } = this.state

    const tracksPageLink = `/artists/${this.artistNameEncoded}/tracks`
    const tracksPageLinkData = <Link to={tracksPageLink}>Top tracks</Link>
    const headerData = <Header as="h3" content={tracksPageLinkData} />

    const tracksData = tracks && this.tracksData()

    const errorData = error && <ErrorMessage {...{ error }} />

    const contentData = tracksData || errorData

    return (
      <Segment.Group className="artistPageSegmentWrap">
        <Segment content={headerData} />
        <Segment
          className="artistPageSegment"
          content={contentData}
          loading={isLoading}
        />
      </Segment.Group>
    )
  }
}
