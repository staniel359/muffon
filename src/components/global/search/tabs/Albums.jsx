import React from 'react'
import { HashRouter as Router } from 'react-router-dom'
import { List, Tab, Button, Ref, Segment } from 'semantic-ui-react'
import { v4 as uuid } from 'uuid'
import axios from 'axios'
import ErrorData from 'partials/ErrorData'
import Album from './albums/Album'

export default class Albums extends React.PureComponent {
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

    const url = '/lastfm/search/albums'
    const params = { query: query, limit: 20, page: page }
    const extra = { params: params, cancelToken: this.request.token }

    const scrollToTabTop = () => (this.tabRef.current.scrollTop = 0)

    const handleSuccess = resp => {
      this.setState({
        albums: resp.data.search.albums,
        currentPage: page
      })

      scrollToTabTop()
    }

    const handleError = error => this.setState({ error: error, albums: null })

    axios
      .get(url, extra)
      .then(handleSuccess)
      .catch(handleError)
      .then(switchLoader)
  }

  render () {
    const { loading, albums, currentPage, error } = this.state
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

    const albumData = album => <Album key={uuid()} {...{ album, hideSearch }} />
    const albumsList = albums && albums.map(albumData)
    const albumsData = (
      <Router>
        <Ref innerRef={this.tabRef}>
          <div className="searchResultsTabContent">
            <List
              selection
              size="medium"
              verticalAlign="middle"
              className="searchResultsTabContentList"
              content={albumsList}
            />

            {pagination}
          </div>
        </Ref>
      </Router>
    )

    const errorData = error && <ErrorData {...{ error }} />

    const tabContentData = albums ? albumsData : errorData

    const tabContent = (
      <Segment
        className="searchResultsTabContentWrap"
        loading={active && loading}
      >
        {tabContentData}
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
