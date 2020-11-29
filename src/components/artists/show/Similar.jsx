import React from 'react'
import { Header, Segment, Pagination, Divider } from 'semantic-ui-react'
import axios from 'axios'
import List from './similar/List'
import ErrorData from 'partials/ErrorData'
import { Link } from 'react-router-dom'

export default class Similar extends React.PureComponent {
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

    const url = `/lastfm/artists/${this.artistNameEncoded}/similar_list`
    const limit = 4
    const params = { ...{ limit, page } }
    const cancelToken = this.request.token
    const extra = { ...{ params, cancelToken } }

    const handleSuccess = resp => {
      const { artist } = resp.data
      const { similar } = artist

      const totalPages = artist.total_pages
      const error = null

      this.setState({ ...{ similar, totalPages, error } })
    }

    const handleError = error => {
      const similar = null

      !axios.isCancel(error) && this.setState({ ...{ error, similar } })
    }

    const handleFinish = () => {
      page && this.props.scrollToSegmentTop('similar')

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
    const { loading, similar, error } = this.state

    const similarPageLink = `/artists/${this.artistNameEncoded}/similar`

    const similarData = similar && <List {...{ similar }} />

    const errorData = error && <ErrorData {...{ error }} />

    const contentData = similarData || errorData

    const paginationData = similar && this.pagination()

    return (
      <Segment.Group id="similar" className="artistPageSegmentWrap">
        <Segment>
          <Header as="h3">
            <Link to={similarPageLink}>Similar</Link>
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
