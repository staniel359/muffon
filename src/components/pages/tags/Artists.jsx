import React from 'react'
import axios from 'axios'
import ErrorMessage from 'global/ErrorMessage'
import { Segment, Header } from 'semantic-ui-react'
import Paginated from 'global/Paginated'
import List from './artists/List'

export default class Artists extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { isLoading: false }
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

  getData = page => {
    const switchLoader = isLoading => {
      this._isMounted && this.setState({ ...{ isLoading } })
    }

    switchLoader(true)

    const tagNameEncoded = encodeURIComponent(this.props.tagName)
    const url = `/lastfm/tags/${tagNameEncoded}/artists`
    const params = { ...{ page } }
    const cancelToken = this.request.token
    const extra = { ...{ params, cancelToken } }

    const handleSuccess = resp => {
      const { tag } = resp.data

      const artists = tag.artists
      const responseTotalPages = tag.total_pages
      const responseCurrentPage = tag.page
      const error = null

      this.setState({
        ...{ artists, responseTotalPages, responseCurrentPage, error }
      })

      const artistImages = artists.map(a => a.images.small)

      this.props.setArtistImages(artistImages)
    }

    const handleError = error => {
      const artists = null

      !axios.isCancel(error) && this.setState({ ...{ artists, error } })
    }

    const handleFinish = () => switchLoader(false)

    axios
      .get(url, extra)
      .then(handleSuccess)
      .catch(handleError)
      .then(handleFinish)
  }

  artistsData () {
    const {
      artists,
      responseTotalPages,
      responseCurrentPage,
      isLoading
    } = this.state
    const { scrollToTop } = this.props
    const { getData } = this

    const clientPageLimit = 4
    const responsePageLimit = 21
    const collection = artists
    const collectionName = 'artists'
    const collectionList = <List />
    const itemsPerRow = 4

    const artistsDataProps = {
      responseTotalPages,
      responseCurrentPage,
      isLoading,
      scrollToTop,
      getData,
      clientPageLimit,
      responsePageLimit,
      collection,
      collectionName,
      collectionList,
      itemsPerRow
    }

    return <Paginated {...artistsDataProps} />
  }

  render () {
    const { artists, error, isLoading } = this.state

    const headerData = <Header as="h3" content="Top artists" />

    const artistsData = artists && this.artistsData()

    const errorData = error && <ErrorMessage {...{ error }} />

    const contentData = artistsData || errorData

    return (
      <Segment.Group className="tagsPageSegmentWrap">
        <Segment content={headerData} />
        <Segment
          className="tagsPageSegment"
          content={contentData}
          loading={isLoading}
        />
      </Segment.Group>
    )
  }
}
