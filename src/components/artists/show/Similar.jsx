import React from 'react'
import { Header, Segment, Pagination } from 'semantic-ui-react'
import axios from 'axios'
import List from './similar/List'
import ErrorData from 'partials/ErrorData'

export default class Similar extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { loading: true, page: 1 }
  }

  componentDidMount () {
    this.request = axios.CancelToken.source()

    this.getSimilar()
  }

  componentDidUpdate (prevProps, prevState) {
    const pageChanged = this.state.page !== prevState.page

    pageChanged && this.getSimilar()
  }

  componentWillUnmount () {
    this.request.cancel()
  }

  getSimilar () {
    const switchLoader = bool => this.setState({ loading: !!bool })

    switchLoader(true)

    const artistNameEncoded = encodeURIComponent(this.props.artistName)
    const url = `/lastfm/artists/${artistNameEncoded}/similar`
    const params = { limit: 4, page: this.state.page }
    const extra = { params: params, cancelToken: this.request.token }

    const handleSuccess = resp => {
      const { artist } = resp.data

      this.setState({
        similar: artist.similar,
        totalPages: artist.total_pages,
        error: null
      })
    }

    const handleError = error => {
      this.setState({ error: error, similar: null })
    }

    axios
      .get(url, extra)
      .then(handleSuccess)
      .catch(handleError)
      .then(switchLoader)
  }

  render () {
    const { loading, similar, error, page, totalPages } = this.state
    const { scrollToSegmentTop } = this.props

    const similarList = similar && <List {...{ similar }} />
    const errorData = error && <ErrorData {...{ error }} />
    const similarData = similarList || errorData

    const handlePageChange = (_, { activePage }) => {
      scrollToSegmentTop('similar')
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
    const paginationData = similar && <Pagination {...paginationProps} />

    return (
      <Segment.Group id="similar" className="artistPageSegmentWrap">
        <Segment>
          <Header as="h3" content="Similar" />
        </Segment>

        <Segment
          className="artistPageSegment"
          loading={loading}
          content={similarData}
        />

        <Segment className="artistPagePaginationWrap">{paginationData}</Segment>
      </Segment.Group>
    )
  }
}
