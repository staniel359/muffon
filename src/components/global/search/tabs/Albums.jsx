import React from 'react'
import { HashRouter as Router, Link } from 'react-router-dom'
import { List, Image, Tab, Button } from 'semantic-ui-react'
import { v4 as uuid } from 'uuid'
import axios from 'axios'
import ErrorData from '../../../partials/ErrorData'

export default class Albums extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      page: 1
    }
  }

  coverDefault =
    'https://lastfm.freetls.fastly.net/i/u/64s/c6f59c1e5e7240a4c0d427abd71f3dbb.png'

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
        <List
          selection
          size="medium"
          verticalAlign="middle"
          className="globalSearchTab"
          content={this.albumsList()}
        />

        <div className="globalSearchTabPagination">
          {this.previousPageAlbumsButton()}

          {this.nextPageAlbumsButton()}
        </div>
      </Router>
    )
  }

  albumsList () {
    return this.state.albums.map(album => this.albumItem(album))
  }

  albumItem (album) {
    return (
      <List.Item
        as={Link}
        to={this.albumLink(album)}
        key={uuid()}
        onClick={this.props.hideGlobalSearch}
      >
        <Image src={this.cover(album)} className="globalSearchItemImage" />
        <List.Content className="globalSearchItemContent">
          <List.Header as="h4" content={album.title} />
          <List.Description content={album.artist} />
        </List.Content>
      </List.Item>
    )
  }

  albumLink (album) {
    return `/artists/${this.props.encode(
      album.artist
    )}/albums/${this.props.encode(album.title)}`
  }

  cover (album) {
    return album.cover || this.coverDefault
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

  newPage (content) {
    let currentPage = this.state.page
    if (content === 'Next') {
      return (currentPage += 1)
    } else if (content === 'Previous') {
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
        className="globalSearchTabWrap"
        loading={this.props.active && this.state.loading}
        active={this.props.active}
        content={this.successData() || this.errorData()}
      />
    )
  }
}
