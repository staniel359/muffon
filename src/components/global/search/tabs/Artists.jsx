import React from 'react'
import { HashRouter as Router } from 'react-router-dom'
import { List, Tab } from 'semantic-ui-react'
import { v4 as uuid } from 'uuid'
import axios from 'axios'
import ErrorData from '../../../partials/ErrorData'
import Artist from './artists/Artist'

export default class Artists extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  limit = 10

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
      url: '/lastfm/search/artists',
      params: {
        query: this.props.query,
        limit: this.limit
      }
    }
  }

  setSearchResults (resp) {
    this.setState({ artists: resp.data.search.artists })
  }

  handleError (error) {
    this.setState({
      error: error,
      artists: null
    })
  }

  tabData () {
    return <Router>{this.tracksList()}</Router>
  }

  tracksList () {
    return (
      <List
        selection
        size="medium"
        verticalAlign="middle"
        className="searchTab"
        content={this.artistsData()}
      />
    )
  }

  artistsData () {
    return this.state.artists.map(artist => this.artistData(artist))
  }

  artistData (artist) {
    return (
      <Artist key={uuid()} artist={artist} hideSearch={this.props.hideSearch} />
    )
  }

  successData () {
    return this.state.artists && this.tabData()
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
