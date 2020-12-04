import React from 'react'
import axios from 'axios'
import ErrorMessage from 'global/ErrorMessage'
import { Segment, Header } from 'semantic-ui-react'
import ArtistsData from './artists/ArtistsData'

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

  getData = page => {
    const switchLoader = loading => {
      this._isMounted && this.setState({ ...{ loading } })
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
      const totalPages = tag.total_pages
      const currentPage = tag.page
      const error = null

      this.setState({ ...{ artists, totalPages, currentPage, error } })

      this.props.setArtistImages(artists.map(a => a.images.small))
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
    const { artists, totalPages, currentPage, loading } = this.state
    const { scrollToTop } = this.props
    const { getData } = this

    const artistsDataProps = {
      artists,
      totalPages,
      currentPage,
      getData,
      loading,
      scrollToTop
    }

    return <ArtistsData {...artistsDataProps} />
  }

  render () {
    const { artists, error, loading } = this.state

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
          {...{ loading }}
        />
      </Segment.Group>
    )
  }
}
