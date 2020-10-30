import React from 'react'
import { v4 as uuid } from 'uuid'
import { Header, Segment, Pagination } from 'semantic-ui-react'
import axios from 'axios'

export default class Similar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      page: 1
    }
  }

  limit = 4

  componentDidMount () {
    this.getSimilar()
  }

  getSimilar () {
    this.setState({ loading: true })
    axios(this.similarLink()).then(resp => this.setSimilarData(resp))
  }

  similarLink () {
    return {
      method: 'GET',
      url: `/lastfm/artists/${this.props.artistName}/similar`,
      params: {
        limit: this.limit,
        page: this.state.page
      }
    }
  }

  setSimilarData (resp) {
    this.setState({
      similar: resp.data.artist.similar,
      totalPages: resp.data.artist.total_pages,
      loading: false
    })
  }

  similarList () {
    return (
      <div>
        {this.state.similar.map(artist => {
          return <div key={uuid()}>{artist}</div>
        })}
      </div>
    )
  }

  pagination() {
    return (
      <Pagination
        defaultActivePage={this.state.page}
        totalPages={this.state.totalPages}
        firstItem={null}
        lastItem={null}
        siblingRange={0}
        onPageChange={this.handlePageChange}
      />
    )
  }

  handlePageChange = (e, { activePage }) => {
    this.scrollToSegmentTop()
    this.setState(
      { page: activePage },
      this.getSimilar
    )
  }

  scrollToSegmentTop () {
    window.scrollTo(0, this.segmentTop())
  }

  segmentTop() {
    return document.getElementById(
      'artistPageSimilarSegment'
    ).offsetTop - 107
  }

  render () {
    return (
      <React.Fragment>
        <Header as="h3" attached="top" content="Similar" />
        <Segment
          className="artistPageSegment"
          id="artistPageSimilarSegment"
          loading={this.state.loading}
          attached
          content={this.state.similar && this.similarList()}
        />

        <Segment className="artistPagePaginationWrap" attached="bottom">
          {this.state.similar && this.pagination()}
        </Segment>
      </React.Fragment>
    )
  }
}
