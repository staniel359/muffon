import React from 'react'
import { v4 as uuid } from 'uuid'
import { Header, Segment, Pagination, Grid } from 'semantic-ui-react'
import axios from 'axios'
import SimilarArtist from './similar/SimilarArtist'

export default class Similar extends React.Component {
  shouldComponentUpdate (nextProps, nextState) {
    return nextState !== this.state
  }

  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      page: 1
    }
  }

  limit = 4
  artistName = encodeURIComponent(this.props.artistName)

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
      url: `/lastfm/artists/${this.artistName}/similar`,
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

  similarData () {
    return (
      <Grid columns={4} textAlign="center">
        {this.state.similar.map(artistName => {
          return this.similarArtistData(artistName)
        })}
      </Grid>
    )
  }

  similarArtistData (artistName) {
    return (
      <Grid.Column key={uuid()}>
        <SimilarArtist artistName={artistName} />
      </Grid.Column>
    )
  }

  pagination () {
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

  handlePageChange = (_, { activePage }) => {
    this.props.scrollToSegmentTop('similar')
    this.setState({ page: activePage }, this.getSimilar)
  }

  render () {
    return (
      <div id="similar" className="artistPageSegmentWrap">
        <Header as="h3" attached="top" content="Similar" />

        <Segment
          className="artistPageSegment"
          loading={this.state.loading}
          attached
          content={this.state.similar && this.similarData()}
        />

        <Segment className="artistPagePaginationWrap" attached="bottom">
          {this.state.similar && this.pagination()}
        </Segment>
      </div>
    )
  }
}
