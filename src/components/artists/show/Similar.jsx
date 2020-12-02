import React from 'react'
import { Header, Segment, Ref } from 'semantic-ui-react'
import axios from 'axios'
import ErrorData from 'partials/ErrorData'
import { Link } from 'react-router-dom'
import ArtistsData from './similar/ArtistsData'

export default class Similar extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { loading: false, currentPage: 1 }
  }

  componentDidMount () {
    this.artistsRef = React.createRef()

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
    const { getData } = this

    const scrollToTop = () => {
      this.scrollToSegmentTop(this.artistsRef)
    }

    const artistsDataProps = {
      artists,
      totalPages,
      currentPage,
      loading,
      getData,
      scrollToTop
    }

    return <ArtistsData {...artistsDataProps} />
  }

  scrollToSegmentTop = segment => {
    const segmentTop = segment.current.offsetTop - 60

    window.scrollTo(0, segmentTop)
  }

  render () {
    const { artists, error, loading } = this.state

    const innerRef = this.artistsRef

    const artistsPageLink = `/artists/${this.artistNameEncoded}/similar`
    const artistsPageLinkData = <Link to={artistsPageLink}>Similar</Link>
    const headerData = <Header as="h3" content={artistsPageLinkData} />

    const artistsData = artists && this.artistsData()

    const errorData = error && <ErrorData {...{ error }} />

    const contentData = artistsData || errorData

    return (
      <Ref {...{ innerRef }}>
        <Segment.Group id="similar" className="artistPageSegmentWrap">
          <Segment content={headerData} />
          <Segment
            className="artistPageSegment"
            content={contentData}
            {...{ loading }}
          />
        </Segment.Group>
      </Ref>
    )
  }
}
