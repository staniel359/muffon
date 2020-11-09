import React from 'react'
import { HashRouter as Router } from 'react-router-dom'
import { List, Tab } from 'semantic-ui-react'
import { v4 as uuid } from 'uuid'
import axios from 'axios'
import ErrorData from 'partials/ErrorData'
import Artist from './artists/Artist'

export default class Artists extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { loading: true }
  }

  componentDidMount () {
    this.search()
  }

  search () {
    this.switchLoader(true)

    const url = '/lastfm/search/artists'
    const params = { query: this.props.query, limit: 10 }

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
    this.setState({ artists: resp.data.search.artists })
  }

  handleError = error => {
    this.setState({ error: error, artists: null })
  }

  artistData = artist => {
    const { hideSearch } = this.props
    const key = uuid()

    return <Artist {...{ key, artist, hideSearch }} />
  }

  render () {
    const { loading, artists, error } = this.state
    const { active } = this.props

    const artistsList = artists && artists.map(this.artistData)
    const artistsData = (
      <List
        selection
        size="medium"
        verticalAlign="middle"
        className="searchTab"
        content={artistsList}
      />
    )

    const successData = <Router>{artistsData}</Router>

    const errorData = error && <ErrorData {...{ error }} />

    const tabContent = artists ? successData : errorData

    return (
      <Tab.Pane
        className="searchTabWrap"
        active={active}
        loading={active && loading}
        content={tabContent}
      />
    )
  }
}
