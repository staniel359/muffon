import React from 'react'
import { HashRouter as Router } from 'react-router-dom'
import { List, Button, Tab, Ref, Segment } from 'semantic-ui-react'
import axios from 'axios'
import ErrorData from 'partials/ErrorData'
import { v4 as uuid } from 'uuid'
import Track from './tracks/Track'

export default class Tracks extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { loading: true, currentPage: 1 }
  }

  componentDidMount () {
    this.request = axios.CancelToken.source()

    this.search()
  }

  componentWillUnmount () {
    this.request.cancel()
  }

  search = (e, data) => {
    const switchLoader = bool => this.setState({ loading: !!bool })

    switchLoader(true)

    const { query } = this.props
    const { currentPage } = this.state

    const action = data && data.action
    const nextPage = action === 'next' && currentPage + 1
    const prevPage = action === 'prev' && currentPage - 1
    const page = nextPage || prevPage || 1

    const url = '/lastfm/search/tracks'
    const params = { query: query, limit: 40, page: page }
    const extra = { params: params, cancelToken: this.request.token }

    const scrollToTabTop = () => (this.tabRef.current.scrollTop = 0)

    const handleSuccess = resp => {
      this.setState({
        tracks: resp.data.search.tracks,
        currentPage: page
      })

      scrollToTabTop()
    }

    const handleError = error => this.setState({ error: error, tracks: null })

    axios
      .get(url, extra)
      .then(handleSuccess)
      .catch(handleError)
      .then(switchLoader)
  }

  render () {
    const { loading, tracks, currentPage, error } = this.state
    const { active, hideSearch } = this.props

    this.tabRef = React.createRef()

    const previousPageButton = (
      <Button
        size="tiny"
        icon="left arrow"
        content="Previous"
        action="prev"
        labelPosition="left"
        onClick={this.search}
      />
    )

    const nextPageButton = (
      <Button
        size="tiny"
        icon="right arrow"
        content="Next"
        action="next"
        labelPosition="right"
        onClick={this.search}
      />
    )

    const pagination = (
      <div className="searchResultsTabPagination">
        <div>{currentPage > 1 && previousPageButton}</div>

        <div>{nextPageButton}</div>
      </div>
    )

    const trackData = track => <Track key={uuid()} {...{ track, hideSearch }} />
    const tracksList = tracks && tracks.map(trackData)
    const tracksData = (
      <React.Fragment>
        <List
          selection
          size="medium"
          verticalAlign="middle"
          className="searchResultsTabContentList"
          content={tracksList}
        />

        {pagination}
      </React.Fragment>
    )

    const errorData = error && <ErrorData {...{ error }} />

    const tabContentData = tracks ? tracksData : errorData

    const tabContent = (
      <Segment
        className="searchResultsTabContentWrap"
        loading={active && loading}
      >
        <Router>
          <Ref innerRef={this.tabRef}>
            <div className="searchResultsTabContent">{tabContentData}</div>
          </Ref>
        </Router>
      </Segment>
    )

    return (
      <Tab.Pane
        className="searchResultsTab"
        active={active}
        content={tabContent}
      />
    )
  }
}
