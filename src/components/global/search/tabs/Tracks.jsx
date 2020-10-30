import React from 'react'
import { HashRouter as Router, Link } from 'react-router-dom'
import { List, Button, Tab } from 'semantic-ui-react'
import { v4 as uuid } from 'uuid'
import axios from 'axios'
import ErrorData from '../../../partials/ErrorData'

export default class Tracks extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      page: 1
    }
  }

  limit = 40

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
      url: '/lastfm/search/tracks',
      params: {
        query: this.props.query,
        limit: this.limit,
        page: this.state.page
      }
    }
  }

  setSearchResults (resp) {
    this.setState({ tracks: resp.data.search.tracks })
  }

  handleError (error) {
    this.setState({
      error: error,
      tracks: null
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
          content={this.tracksList()}
        />

        <div className="globalSearchTabPagination">
          {this.previousPageTracksButton()}

          {this.nextPageTracksButton()}
        </div>
      </Router>
    )
  }

  tracksList () {
    return this.state.tracks.map(track => this.trackItem(track))
  }

  trackItem (track) {
    return (
      <List.Item as={Link} to={this.trackLink(track)} key={uuid()}>
        <List.Icon className="globalSearchItemIcon" verticalAlign="middle">
          <Button icon="play" />
        </List.Icon>

        <List.Content onClick={this.props.hideGlobalSearch}>
          <List.Header as="h4" content={track.title} />
          <List.Description content={track.artist} />
        </List.Content>
      </List.Item>
    )
  }

  trackLink (track) {
    return `/artists/${this.props.encode(
      track.artist
    )}/tracks/${this.props.encode(track.title)}`
  }

  previousPageTracksButton () {
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

  nextPageTracksButton () {
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
    return this.state.tracks && this.tabData()
  }

  errorData () {
    return this.state.error && <ErrorData error={this.state.error} />
  }

  render () {
    return (
      <Tab.Pane
        className="globalSearchTabWrap"
        active={this.props.active}
        loading={this.props.active && this.state.loading}
        content={this.successData() || this.errorData()}
      />
    )
  }
}
