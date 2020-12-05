import React from 'react'
import { Header, Segment } from 'semantic-ui-react'
import axios from 'axios'
import ErrorMessage from 'global/ErrorMessage'
import { Link } from 'react-router-dom'
import Paginated from 'global/Paginated'
import List from './similar/List'

export default class Similar extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { loading: false, currentPage: 1 }
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

  artistNameEncoded = encodeURIComponent(this.props.artistName)

  getData = page => {
    const switchLoader = loading => {
      this._isMounted && this.setState({ ...{ loading } })
    }

    switchLoader(true)

    const url = `/lastfm/artists/${this.artistNameEncoded}/similar`
    const params = { ...{ page } }
    const cancelToken = this.request.token
    const extra = { ...{ params, cancelToken } }

    const handleSuccess = resp => {
      const { artist } = resp.data

      const artists = artist.similar
      const totalPages = artist.total_pages
      const currentPage = artist.page
      const error = null

      this.setState({ ...{ artists, totalPages, currentPage, error } })
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
    const { artists, totalPages, currentPage, loading } = this.state
    const { scrollToTop } = this.props
    const { getData } = this

    const activePageLimit = 4
    const currentPageLimit = 10
    const collection = artists
    const collectionName = 'similar'
    const collectionList = <List />
    const itemsPerRow = 4

    const artistsDataProps = {
      totalPages,
      currentPage,
      loading,
      scrollToTop,
      getData,
      activePageLimit,
      currentPageLimit,
      collection,
      collectionName,
      collectionList,
      itemsPerRow
    }

    return <Paginated {...artistsDataProps} />
  }

  render () {
    const { artists, error, loading } = this.state

    const artistsPageLink = `/artists/${this.artistNameEncoded}/similar`
    const artistsPageLinkData = <Link to={artistsPageLink}>Similar</Link>
    const headerData = <Header as="h3" content={artistsPageLinkData} />

    const artistsData = artists && this.artistsData()

    const errorData = error && <ErrorMessage {...{ error }} />

    const contentData = artistsData || errorData

    return (
      <Segment.Group className="artistPageSegmentWrap">
        <Segment content={headerData} />
        <Segment
          className="artistPageSegment"
          content={contentData}
          {...{ loading }}
        />
      </Segment.Group>
    )
  }
}
