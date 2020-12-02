import React from 'react'
import { Segment, Pagination, Divider } from 'semantic-ui-react'
import axios from 'axios'
import ErrorData from 'partials/ErrorData'
import LoaderDimmer from 'partials/LoaderDimmer'
import List from './show/albums/List'

export default class Albums extends React.PureComponent {
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
      this.setState({ albums: null })
      this.getData()
    }
  }

  setNavSections (artistName) {
    const artistNameEncoded = encodeURIComponent(artistName)
    const artistPageLink = `#/artists/${artistNameEncoded}`
    const navSections = [
      { content: 'Artists' },
      { content: artistName, href: artistPageLink },
      { content: 'Albums', active: true }
    ]

    this.props.setNavSections(navSections)
  }

  getData = page => {
    const switchLoader = loading => {
      this._isMounted && this.setState({ ...{ loading } })
    }

    switchLoader(true)

    const url = `/lastfm/artists/${this.params().artistName}/albums`
    const limit = 20
    const params = { ...{ limit, page } }
    const cancelToken = this.request.token
    const extra = { ...{ params, cancelToken } }

    const handleSuccess = resp => {
      const { artist } = resp.data
      const { albums } = artist

      const artistName = artist.name
      const totalPages = artist.total_pages
      const error = null

      this.setState({ ...{ artistName, albums, totalPages, error } })

      this.setNavSections(artistName)
    }

    const handleError = error => {
      const albums = null

      !axios.isCancel(error) && this.setState({ ...{ error, albums } })
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

  albumsList () {
    const { albums, loading, artistName } = this.state

    const itemsPerRow = 4
    const albumsListProps = { albums, artistName, itemsPerRow }
    const albumsListData = <List {...albumsListProps} />

    return (
      <Segment className="artistPageSegment" {...{ loading }}>
        {albumsListData}

        <Divider />

        {this.pagination()}
      </Segment>
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
      <div className="artistPagePaginationWrap">
        <Pagination {...paginationProps} />
      </div>
    )
  }

  render () {
    const { loading, albums, error } = this.state

    const albumsData = albums && this.albumsList()

    const errorData = error && <ErrorData {...{ error }} />

    const loaderData = loading && <LoaderDimmer />

    const contentData = albumsData || errorData || loaderData

    return <React.Fragment>{contentData}</React.Fragment>
  }
}
