import React from 'react'
import { HashRouter as Router } from 'react-router-dom'
import { List, Tab, Button } from 'semantic-ui-react'
import { v4 as uuid } from 'uuid'
import axios from 'axios'
import ErrorData from 'partials/ErrorData'
import Album from './albums/Album'

export default class Albums extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      page: 1
    }
  }

  limit = 20

  componentDidMount () {
    this.search()
  }

  search () {
    this.setState({ loading: true })

    axios(this.searchLink())
      .then(resp => this.setSearchResults(resp))
      .catch(error => this.handleError(error))
      .then(() => this.setState({ loading: false }))
  }

  searchLink () {
    return {
      method: 'GET',
      url: '/lastfm/search/albums',
      params: {
        query: this.props.query,
        limit: this.limit,
        page: this.state.page
      }
    }
  }

  setSearchResults (resp) {
    this.setState({ albums: resp.data.search.albums })
  }

  handleError (error) {
    this.setState({
      error: error,
      albums: null
    })
  }

  tabData () {
    return (
      <Router>
        {this.albumsList()}

        {this.pagination()}
      </Router>
    )
  }

  albumsList () {
    return (
      <List
        selection
        size="medium"
        verticalAlign="middle"
        className="searchTab"
        content={this.albumsData()}
      />
    )
  }

  albumsData () {
    return this.state.albums.map(album => this.albumData(album))
  }

  albumData (album) {
    return (
      <Album key={uuid()} album={album} hideSearch={this.props.hideSearch} />
    )
  }

  pagination () {
    return (
      <div className="searchTabPagination">
        {this.previousPageAlbumsButton()}

        {this.nextPageAlbumsButton()}
      </div>
    )
  }

  previousPageAlbumsButton () {
    if (this.state.page > 1) {
      return (
        <Button
          size="tiny"
          icon="left arrow"
          content="Previous"
          floated="left"
          labelPosition="left"
          onClick={this.handlePageButtonClick}
        />
      )
    }
  }

  handlePageButtonClick = (_, { content }) => {
    this.props.scrollTabToTop()
    this.setState({ page: this.newPage(content) }, this.search)
  }

  newPage (action) {
    let currentPage = this.state.page
    switch (action) {
      case 'Next':
        return (currentPage += 1)
      case 'Previous':
        return (currentPage -= 1)
    }
  }

  nextPageAlbumsButton () {
    return (
      <Button
        size="tiny"
        icon="right arrow"
        content="Next"
        floated="right"
        labelPosition="right"
        onClick={this.handlePageButtonClick}
      />
    )
  }

  successData () {
    return this.state.albums && this.tabData()
  }

  errorData () {
    return this.state.error && <ErrorData error={this.state.error} />
  }

  render () {
    return (
      <Tab.Pane
        className="searchTabWrap"
        active={this.props.active}
        loading={this.props.active && this.state.loading}
        content={this.successData() || this.errorData()}
      />
    )
  }
}
