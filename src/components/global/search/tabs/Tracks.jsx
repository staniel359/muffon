import React from 'react'
import { Tab, Ref, Segment, Pagination, Divider } from 'semantic-ui-react'
import axios from 'axios'
import ErrorMessage from 'partials/ErrorMessage'
import List from './tracks/List'

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

    const handleFinish = () => switchLoader(false)

    axios
      .get(url, extra)
      .then(handleSuccess)
      .catch(handleError)
      .then(handleFinish)
  }

  tracksData () {
    const { tracks } = this.state
    const { hideSearch } = this.props

    const tracksListDataProps = { tracks, hideSearch }
    const tracksListData = <List {...tracksListDataProps} />

    return (
      <Ref innerRef={this.tabRef}>
        <div className="searchResultsTabContent">
          {tracksListData}

          <Divider />

          {this.pagination()}
        </div>
      </Ref>
    )
  }

  pagination () {
    const { totalPages, loading } = this.state

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

    return (
      <div className="searchResultsTabPagination">
        <Pagination {...paginationProps} />
      </div>
    )
  }

  render () {
    const { tracks, error } = this.state
    const { active } = this.props

    const loading = active && this.state.loading

    const tracksData = tracks && this.tracksData()

    const errorData = error && <ErrorMessage {...{ error }} />

    const contentData = tracksData || errorData

    return (
      <Tab.Pane className="searchResultsTab" {...{ active }}>
        <Segment
          className="searchResultsTabContentWrap"
          content={contentData}
          {...{ loading }}
        />
      </Tab.Pane>
    )
  }
}
