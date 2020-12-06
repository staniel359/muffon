import React from 'react'
import { Tab, Ref, Segment, Divider } from 'semantic-ui-react'
import axios from 'axios'
import ErrorMessage from 'global/ErrorMessage'
import List from './artists/List'
import Pagination from 'global/Pagination'

export default class Artists extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { isLoading: false }
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
    const switchLoader = isLoading => {
      this._isMounted && this.setState({ ...{ isLoading } })
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
      const { artists } = search

      const totalPages = search.total_pages
      const error = null

      this.setState({ ...{ artists, totalPages, error } })

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
    const { artists, totalPages, isLoading } = this.state
    const { hideSearch, artistsRef } = this.props

    const artistsDataProps = { artists, hideSearch }

    const handlePageChange = this.getData
    const paginationProps = { totalPages, isLoading, handlePageChange }

    return (
      <Ref innerRef={artistsRef}>
        <div className="searchResultsTabContent">
          <List {...artistsDataProps} />

          <Divider />

          <Pagination {...paginationProps} />
        </div>
      </Ref>
    )
  }

  render () {
    const { artists, error, isLoading } = this.state
    const { active } = this.props

    const artistsData = artists && this.artistsData()

    const errorData = error && <ErrorMessage {...{ error }} />

    const contentData = artistsData || errorData

    return (
      <Tab.Pane className="searchResultsTab" {...{ active }}>
        <Segment
          className="searchResultsTabContentWrap"
          content={contentData}
          loading={active && isLoading}
        />
      </Tab.Pane>
    )
  }
}
