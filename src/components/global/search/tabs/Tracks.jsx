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
    this.switchLoader(true)

    const url = '/lastfm/search/tracks'
    const params = {
      query: this.props.query,
      limit: 40,
      page: this.state.page
    }

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
    this.setState({ tracks: resp.data.search.tracks })
  }

  handleError = error => {
    this.setState({ error: error, tracks: null })
  }

  trackData = track => {
    const { hideSearch } = this.props
    const key = uuid()

    return <Track {...{ key, track, hideSearch }} />
  }

  changePage = (_, { content }) => {
    this.tabRef.current.scrollTop = 0

    this.setState({ page: this.newPage(content) }, this.search)
  }

  tabRef = React.createRef()

  newPage (action) {
    const { page } = this.state

    switch (action) {
      case 'Next':
        return page + 1
      case 'Previous':
        return page - 1
    }
  }

  render () {
    const { loading, tracks, page, error } = this.state
    const { active } = this.props
    const { changePage } = this

    const tracksList = tracks && tracks.map(this.trackData)
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
