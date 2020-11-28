import React from 'react'
import { HashRouter as Router } from 'react-router-dom'
import { List, Tab, Ref, Segment, Pagination, Divider } from 'semantic-ui-react'
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
      const { search } = resp.data

      this.setState({
        albums: search.albums,
        totalPages: search.total_pages,
        error: null
      })

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
    const { albums, totalPages, loading } = this.state
    const { hideSearch } = this.props

    const albumData = album => {
      const key = uuid()
      const albumsProps = { album, hideSearch, key }

      return <Album {...albumsProps} />
    }
    const albumsList = albums.map(albumData)
    const albumsListData = (
      <List
        selection
        size="medium"
        verticalAlign="middle"
        className="searchResultsTabContentList"
        content={albumsList}
      />
    )

    const handlePageChange = (_, { activePage }) => {
      this.setState({ currentPage: activePage })
      this.getData(activePage)
    }
    const paginationProps = {
      totalPages: totalPages,
      onPageChange: handlePageChange,
      firstItem: null,
      lastItem: null,
      siblingRange: 0,
      disabled: loading
    }
    const paginationData = (
      <div className="searchResultsTabPagination">
        <Pagination {...paginationProps} />
      </div>
    )

    return (
      <Router>
        <Ref innerRef={this.tabRef}>
          <div className="searchResultsTabContent">
            {albumsListData}

            <Divider />

            {paginationData}
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
