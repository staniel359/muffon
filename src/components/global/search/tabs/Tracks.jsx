import React from 'react'
import { Tab, Ref, Segment, Divider } from 'semantic-ui-react'
import axios from 'axios'
import ErrorMessage from 'global/ErrorMessage'
import List from './tracks/List'
import Pagination from 'global/Pagination'

export default class Tracks extends React.PureComponent {
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

    const url = '/lastfm/search/tracks'
    const limit = 50
    const params = { ...{ query, limit, page } }
    const cancelToken = this.request.token
    const extra = { ...{ params, cancelToken } }

    const handleSuccess = resp => {
      const { search } = resp.data
      const { tracks } = search

      const totalPages = search.total_pages
      const error = null

      this.setState({ ...{ tracks, totalPages, error } })

      scrollToTop('tracks')
    }

    const handleError = error => {
      const tracks = null

      !axios.isCancel(error) && this.setState({ ...{ error, tracks } })
    }

    const handleFinish = () => switchLoader(false)

    axios
      .get(url, extra)
      .then(handleSuccess)
      .catch(handleError)
      .then(handleFinish)
  }

  tracksData () {
    const { tracks, totalPages, isLoading } = this.state
    const { hideSearch, tracksRef } = this.props

    const tracksDataProps = { tracks, hideSearch }

    const handlePageChange = this.getData
    const paginationProps = { totalPages, isLoading, handlePageChange }

    return (
      <Ref innerRef={tracksRef}>
        <div className="searchResultsTabContent">
          <List {...tracksDataProps} />

          <Divider />

          <Pagination {...paginationProps} />
        </div>
      </Ref>
    )
  }

  render () {
    const { tracks, error, isLoading } = this.state
    const { active } = this.props

    const tracksData = tracks && this.tracksData()

    const errorData = error && <ErrorMessage {...{ error }} />

    const contentData = tracksData || errorData

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
