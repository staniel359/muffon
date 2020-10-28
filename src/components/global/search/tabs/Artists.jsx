import React from 'react'
import { HashRouter as Router, Link } from 'react-router-dom'
import { List, Image, Tab } from 'semantic-ui-react'
import { v4 as uuid } from 'uuid'
import axios from 'axios'
import ErrorData from '../../../partials/ErrorData'

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
    return (
      <Router>
        <List
          selection
          size="medium"
          verticalAlign="middle"
          className="globalSearchTab"
          content={this.artistsList()}
        />
      </Router>
    )
  }

  artistsList () {
    return this.state.artists.map(artist => this.artistItem(artist))
  }

  artistItem (artist) {
    const listenersCount = artist.listeners_count.toLocaleString('eu')
    return (
      <List.Item
        as={Link}
        to={this.artistLink(artist)}
        key={uuid()}
        onClick={this.props.hideGlobalSearch}
      >
        <Image src={artist.image} avatar className="globalSearchItemImage" />
        <List.Content className="globalSearchItemContent">
          <List.Header as="h4">{artist.name}</List.Header>
          <List.Description>{`${listenersCount} listeners`}</List.Description>
        </List.Content>
      </List.Item>
    )
  }

  artistLink (artist) {
    return `/artists/${this.props.encode(artist.name)}`
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
        className="globalSearchTabWrap"
        loading={this.props.active && this.state.loading}
        active={this.props.active}
        content={this.successData() || this.errorData()}
      />
    )
  }
}
