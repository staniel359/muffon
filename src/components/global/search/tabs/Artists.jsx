import React from 'react'
import { Tab, Ref, Segment, Pagination, Divider } from 'semantic-ui-react'
import axios from 'axios'
import ErrorMessage from 'partials/ErrorMessage'
import List from './artists/List'

export default class Artists extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { loading: false }
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

  getData (page) {
    const switchLoader = loading => {
      this._isMounted && this.setState({ ...{ loading } })
    }

    switchLoader(true)

    const { query, scrollToTop } = this.props

    const url = '/lastfm/search/artists'
    const limit = 20
    const params = { ...{ query, limit, page } }
    const cancelToken = this.request.token
    const extra = { ...{ params, cancelToken } }

    const handleSuccess = resp => {
      const { search } = resp.data

      this.setState({
        artists: search.artists,
        totalPages: search.total_pages,
        error: null
      })

      scrollToTop('artists')
    }

    const handleError = error => {
      const artists = null

      !axios.isCancel(error) && this.setState({ ...{ error, artists } })
    }

    const handleFinish = () => switchLoader(false)

    axios
      .get(url, extra)
      .then(handleSuccess)
      .catch(handleError)
      .then(handleFinish)
  }

  artistsData () {
    const { artists } = this.state
    const { hideSearch, artistsRef } = this.props

    const artistsListDataProps = { artists, hideSearch }
    const artistsListData = <List {...artistsListDataProps} />

    return (
      <Ref innerRef={artistsRef}>
        <div className="searchResultsTabContent">
          {artistsListData}

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
      <div className="paginationWrap">
        <Pagination {...paginationProps} />
      </div>
    )
  }

  render () {
    const { artists, error } = this.state
    const { active } = this.props

    const loading = active && this.state.loading

    const artistsData = artists && this.artistsData()

    const errorData = error && <ErrorMessage {...{ error }} />

    const contentData = artistsData || errorData

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
