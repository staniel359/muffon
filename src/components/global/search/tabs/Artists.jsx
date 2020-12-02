import React from 'react'
import { Tab, Segment } from 'semantic-ui-react'
import axios from 'axios'
import ErrorMessage from 'partials/ErrorMessage'
import List from './artists/List'

export default class Artists extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { loading: false }
  }

  componentDidMount () {
    this._isMounted = true
    this.request = axios.CancelToken.source()

    this.getData()
  }

  componentWillUnmount () {
    this._isMounted = false
    this.request.cancel()
  }

  getData () {
    const switchLoader = loading => {
      this._isMounted && this.setState({ ...{ loading } })
    }

    switchLoader(true)

    const { query } = this.props

    const url = '/lastfm/search/artists'
    const limit = 10
    const params = { ...{ query, limit } }
    const cancelToken = this.request.token
    const extra = { ...{ params, cancelToken } }

    const handleSuccess = resp => {
      this.setState({ artists: resp.data.search.artists })
    }

    const handleError = error => {
      !axios.isCancel(error) && this.setState({ error: error, artists: null })
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
    const { hideSearch } = this.props

    const artistsListDataProps = { artists, hideSearch }
    const artistsListData = <List {...artistsListDataProps} />

    return <div className="searchResultsTabContent">{artistsListData}</div>
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
