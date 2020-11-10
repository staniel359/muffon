import React from 'react'
import { HashRouter as Router } from 'react-router-dom'
import { List, Button, Tab, Ref } from 'semantic-ui-react'
import axios from 'axios'
import ErrorData from 'partials/ErrorData'
import { v4 as uuid } from 'uuid'
import Track from './tracks/Track'

export default class Tracks extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { loading: true, page: 1 }
  }

  componentDidMount () {
    this.search()
  }

  search () {
    const switchLoader = bool => this.setState({ loading: !!bool })

    switchLoader(true)

    const { query } = this.props
    const { page } = this.state

    const url = '/lastfm/search/tracks'
    const params = { params: { query: query, limit: 40, page: page } }

    const handleSuccess = resp =>
      this.setState({ tracks: resp.data.search.tracks })
    const handleError = error => this.setState({ error: error, tracks: null })

    axios
      .get(url, params)
      .then(handleSuccess)
      .catch(handleError)
      .then(switchLoader)
  }

  render () {
    const { loading, tracks, page, error } = this.state
    const { active, hideSearch } = this.props

    const trackData = track => <Track key={uuid()} {...{ track, hideSearch }} />
    const tracksList = tracks && tracks.map(trackData)
    const tracksData = (
      <Router>
        <List
          selection
          size="medium"
          verticalAlign="middle"
          className="searchTab"
          content={tracksList}
        />
      </Router>
    )

    this.tabRef = React.createRef()

    const newPage = action => {
      switch (action) {
        case 'Next':
          return page + 1
        case 'Previous':
          return page - 1
      }
    }

    const changePage = (_, { content }) => {
      this.tabRef.current.scrollTop = 0
      this.setState({ page: newPage(content) }, this.search)
    }

    const previousPageButton = (
      <Button
        size="tiny"
        icon="left arrow"
        content="Previous"
        floated="left"
        labelPosition="left"
        onClick={changePage}
      />
    )

    const nextPageButton = (
      <Button
        size="tiny"
        icon="right arrow"
        content="Next"
        floated="right"
        labelPosition="right"
        onClick={changePage}
      />
    )

    const pagination = (
      <div className="searchTabPagination">
        {page > 1 && previousPageButton}
        {nextPageButton}
      </div>
    )

    const successData = (
      <React.Fragment>
        {tracksData}
        {pagination}
      </React.Fragment>
    )

    const errorData = error && <ErrorData {...{ error }} />

    const tabContent = tracks ? successData : errorData

    return (
      <Ref innerRef={this.tabRef}>
        <Tab.Pane
          className="searchTabWrap"
          active={active}
          loading={active && loading}
          content={tabContent}
        />
      </Ref>
    )
  }
}
