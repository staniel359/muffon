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
    this.getSimilar()
  }

  componentDidUpdate (prevProps, prevState) {
    const pageChanged = this.state.page !== prevState.page

    pageChanged && this.getSimilar()
  }

  getSimilar () {
    this.switchLoader(true)

    const artistNameEncoded = encodeURIComponent(this.props.artistName)
    const url = `/lastfm/artists/${artistNameEncoded}/similar`
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
      similar: artist.similar,
      totalPages: artist.total_pages,
      error: null
    })
  }

  handleError = error => {
    this.setState({ error: error, similar: null })
  }

  handlePageChange = (_, { activePage }) => {
    this.props.scrollToSegmentTop('similar')

    this.setState({ page: activePage })
  }

  render () {
    const { loading, similar, error, page, totalPages } = this.state

    const similarList = similar && <List {...{ similar }} />
    const errorData = error && <ErrorData {...{ error }} />
    const similarData = similarList || errorData
    const paginationData = similar && (
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
