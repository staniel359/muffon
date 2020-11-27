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
    this.state = { loading: false, currentPage: 1 }
  }

  componentDidMount () {
    this.tabRef = React.createRef()

    this._isMounted = true
    this.request = axios.CancelToken.source()

    this.getData()
  }

  componentWillUnmount () {
    this._isMounted = false
    this.request.cancel()
  }

  getData = page => {
    const switchLoader = loading => {
      this._isMounted && this.setState({ ...{ loading } })
    }

    switchLoader(true)

    const { query } = this.props

    const url = '/lastfm/search/albums'
    const limit = 20
    const params = { ...{ query, limit, page } }
    const cancelToken = this.request.token
    const extra = { ...{ params, cancelToken } }

    const scrollToTabTop = () => (this.tabRef.current.scrollTop = 0)

    const handleSuccess = resp => {
      this.setState({ albums: resp.data.search.albums })

      scrollToTabTop()
    }

    const handleError = error => {
      !axios.isCancel(error) && this.setState({ error: error, albums: null })
    }

    axios
      .get(url, extra)
      .then(handleSuccess)
      .catch(handleError)
      .then(() => switchLoader(false))
  }

  albumsData () {
    const { albums, currentPage } = this.state
    const { hideSearch } = this.props

    const albumData = album => {
      const key = uuid()
      const albumsProps = { album, hideSearch, key }

      return <Album {...albumsProps} />
    }
    const albumsListData = albums.map(albumData)
    const albumsList = (
      <List
        selection
        size="medium"
        verticalAlign="middle"
        className="searchResultsTabContentList"
        content={albumsListData}
      />
    )

    const handlePageButtonClick = (_, { action }) => {
      const prevPage = action === 'prev' && currentPage - 1
      const nextPage = action === 'next' && currentPage + 1
      const page = prevPage || nextPage || 1

      this.setState({ currentPage: page })
      this.getData(page)
    }

    const previousPageButton = currentPage > 1 && (
      <Button
        icon="left arrow"
        content="Previous"
        action="prev"
        labelPosition="left"
        onClick={handlePageButtonClick}
      />
    )

    const nextPageButton = (
      <Button
        icon="right arrow"
        content="Next"
        action="next"
        labelPosition="right"
        onClick={handlePageButtonClick}
      />
    )

    const pagination = (
      <div className="searchResultsTabPagination">
        <div>{previousPageButton}</div>
        <div>{nextPageButton}</div>
      </div>
    )

    return (
      <Router>
        <Ref innerRef={this.tabRef}>
          <div className="searchResultsTabContent">
            {albumsList}
            {pagination}
          </div>
        </Ref>
      </Router>
    )
  }

  render () {
    const { albums, error } = this.state
    const { active } = this.props

    const loading = active && this.state.loading

    const albumsData = albums && this.albumsData()

    const errorData = error && <ErrorData {...{ error }} />

    const content = albumsData || errorData

    return (
      <Tab.Pane className="searchResultsTab" {...{ active }}>
        <Segment
          className="searchResultsTabContentWrap"
          {...{ loading, content }}
        />
      </Tab.Pane>
    )
  }
}
