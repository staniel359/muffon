import React from 'react'
import { HashRouter as Router } from 'react-router-dom'
import { List, Tab, Ref, Segment, Pagination, Divider } from 'semantic-ui-react'
import axios from 'axios'
import ErrorData from 'partials/ErrorData'
import { v4 as uuid } from 'uuid'
import TrackContextWrap from 'global/artists/TrackContextWrap'

export default class Tracks extends React.PureComponent {
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

    const url = '/lastfm/search/tracks'
    const limit = 40
    const params = { ...{ query, limit, page } }
    const cancelToken = this.request.token
    const extra = { ...{ params, cancelToken } }

    const scrollToTabTop = () => (this.tabRef.current.scrollTop = 0)

    const handleSuccess = resp => {
      const { search } = resp.data

      this.setState({
        tracks: search.tracks,
        totalPages: search.total_pages,
        error: null
      })

      scrollToTabTop()
    }

    const handleError = error => {
      !axios.isCancel(error) && this.setState({ error: error, tracks: null })
    }

    axios
      .get(url, extra)
      .then(handleSuccess)
      .catch(handleError)
      .then(() => switchLoader(false))
  }

  tracksData () {
    const { tracks, totalPages } = this.state
    const { hideSearch } = this.props

    const trackData = track => {
      const artistName = track.artist
      const artist = true
      const key = uuid()
      const trackProps = { track, artistName, artist, hideSearch, key }

      return <TrackContextWrap {...trackProps} />
    }
    const tracksList = tracks.map(trackData)
    const tracksListData = (
      <List
        selection
        size="medium"
        verticalAlign="middle"
        className="searchResultsTabContentList"
        content={tracksList}
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
      siblingRange: 0
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
            {tracksListData}

            <Divider />

            {paginationData}
          </div>
        </Ref>
      </Router>
    )
  }

  render () {
    const { tracks, error } = this.state
    const { active } = this.props

    const loading = active && this.state.loading

    const tracksData = tracks && this.tracksData()

    const errorData = error && <ErrorData {...{ error }} />

    const content = tracksData || errorData

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
