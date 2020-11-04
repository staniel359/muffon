import React from 'react'
import { Header, Segment, Pagination } from 'semantic-ui-react'
import axios from 'axios'
import List from './similar/List'

export default class Similar extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { loading: true, page: 1 }
  }

  componentDidMount () {
    this.getSimilar()
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.state.page !== prevState.page) {
      this.getSimilar()
    }
  }

  getSimilar () {
    this.setState({ loading: true })
    axios(this.similarLink()).then(resp => this.setSimilarData(resp))
  }

  similarLink () {
    return {
      method: 'GET',
      url: `/lastfm/artists/${this.artistName}/similar`,
      params: { limit: 4, page: this.state.page }
    }
  }

  artistName = encodeURIComponent(this.props.artistName)

  setSimilarData (resp) {
    const data = resp.data.artist

    this.setState({
      similar: data.similar,
      totalPages: data.total_pages,
      loading: false
    })
  }

  similarList () {
    const { similar } = this.state

    return <List {...{ similar }} />
  }

  pagination () {
    return (
      <Pagination
        defaultActivePage={this.state.page}
        totalPages={this.state.totalPages}
        onPageChange={this.handlePageChange}
        firstItem={null}
        lastItem={null}
        siblingRange={0}
      />
    )
  }

  handlePageChange = (_, { activePage }) => {
    this.props.scrollToSegmentTop('similar')

    this.setState({ page: activePage })
  }

  render () {
    return (
      <div id="similar" className="artistPageSegmentWrap">
        <Segment.Group>
          <Segment>
            <Header as="h3" content="Similar" />
          </Segment>

          <Segment
            className="artistPageSegment"
            loading={this.state.loading}
            content={this.state.similar && this.similarList()}
          />

          <Segment className="artistPagePaginationWrap">
            {this.state.similar && this.pagination()}
          </Segment>
        </Segment.Group>
      </div>
    )
  }
}
