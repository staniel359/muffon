import React from 'react'
import { Segment, Divider } from 'semantic-ui-react'
import axios from 'axios'
import ErrorMessage from 'global/ErrorMessage'
import LoaderDimmer from 'global/LoaderDimmer'
import List from './show/tracks/List'
import Pagination from 'global/Pagination'
import 'styles/artists/Tracks.sass'

export default class Tracks extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { loading: false, currentPage: 1 }
  }

  componentDidMount () {
    this._isMounted = true
    this.request = axios.CancelToken.source()

    this.setNavSections(this.params().artistName)
    this.getData()
  }

  componentDidUpdate (prevProps, prevState) {
    this.handleArtistChange(prevProps)
  }

  componentWillUnmount () {
    this._isMounted = false
    this.request.cancel()
  }

  params = () => this.props.match.params

  handleArtistChange (prevProps) {
    const { artistName } = this.params()

    const prevArtistName = prevProps.match.params.artistName
    const artistChanged = artistName !== prevArtistName

    if (artistChanged) {
      this.setNavSections(artistName)
      this.setState({ tracks: null })
      this.getData()
    }
  }

  setNavSections (artistName) {
    const artistNameEncoded = encodeURIComponent(artistName)
    const artistPageLink = `#/artists/${artistNameEncoded}`
    const navSections = [
      { content: 'Artists' },
      { content: artistName, href: artistPageLink },
      { content: 'Tracks', active: true }
    ]

    this.props.setNavSections(navSections)
  }

  getData = page => {
    const switchLoader = loading => {
      this._isMounted && this.setState({ ...{ loading } })
    }

    switchLoader(true)

    const url = `/lastfm/artists/${this.params().artistName}/tracks`
    const limit = 50
    const params = { ...{ limit, page } }
    const cancelToken = this.request.token
    const extra = { ...{ params, cancelToken } }

    const handleSuccess = resp => {
      const { artist } = resp.data
      const { tracks } = artist

      const pageTopTrackCount =
        page > 1 ? this.state.topTrackCount : tracks[0].listeners_count
      const topTrackCount = tracks.length > 0 ? pageTopTrackCount : 0

      const artistName = artist.name
      const totalPages = artist.total_pages
      const error = null

      this.setState({
        ...{ tracks, topTrackCount, artistName, totalPages, error }
      })

      this.setNavSections(artistName)
    }

    const handleError = error => {
      const tracks = null

      !axios.isCancel(error) && this.setState({ ...{ error, tracks } })
    }

    const handleFinish = () => {
      window.scrollTo(0, 0)

      switchLoader(false)
    }

    axios
      .get(url, extra)
      .then(handleSuccess)
      .catch(handleError)
      .then(handleFinish)
  }

  tracksData () {
    const {
      tracks,
      loading,
      artistName,
      topTrackCount,
      totalPages
    } = this.state

    const tracksDataProps = { tracks, artistName, topTrackCount }

    const handlePageChange = this.getData
    const paginationProps = { totalPages, loading, handlePageChange }

    return (
      <Segment className="pageSegment" {...{ loading }}>
        <List {...tracksDataProps} />

        <Divider />

        <Pagination {...paginationProps} />
      </Segment>
    )
  }

  render () {
    const { loading, tracks, error } = this.state

    const tracksData = tracks && this.tracksData()

    const errorData = error && <ErrorMessage {...{ error }} />

    const loaderData = loading && <LoaderDimmer />

    const contentData = tracksData || errorData || loaderData

    return <React.Fragment>{contentData}</React.Fragment>
  }
}
