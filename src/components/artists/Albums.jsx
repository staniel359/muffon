import React from 'react'
import { v4 as uuid } from 'uuid'
import { Segment, Dimmer, Loader, Pagination } from 'semantic-ui-react'
import axios from 'axios'
import ErrorData from 'partials/ErrorData'
import List from './albums/List'

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
    const { artistName } = this.params()

    const prevArtistName = prevProps.match.params.artistName
    const artistChanged = artistName !== prevArtistName

    if (artistChanged) {
      this.setNavSections(artistName)
      this.getData()
    }
  }

  componentWillUnmount () {
    this._isMounted = false
    this.request.cancel()
  }

  params = () => this.props.match.params

  setNavSections (artistName) {
    const artistNameEncoded = encodeURIComponent(artistName)
    const artistPageLink = `#/artists/${artistNameEncoded}`
    const navSections = [
      { key: uuid(), content: 'Artists' },
      { key: uuid(), content: artistName, href: artistPageLink },
      { key: uuid(), content: 'Albums', active: true }
    ]

    this.props.setNavSections(navSections)
  }

  getData = page => {
    const switchLoader = loading => {
      this._isMounted && this.setState({ ...{ loading } })
    }

    switchLoader(true)

    const url = `/lastfm/artists/${this.params().artistName}/albums`
    const limit = 12
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

      window.scrollTo(0, 0)
    }

    const handleError = error => {
      const albums = null

      !axios.isCancel(error) && this.setState({ ...{ error, albums } })
    }

    axios
      .get(url, extra)
      .then(handleSuccess)
      .catch(handleError)
      .then(() => switchLoader(false))
  }

  albumsList () {
    const { albums, loading, artistName } = this.state

    const albumsListProps = { albums, artistName }
    const albumsListData = <List {...albumsListProps} />

    const paginationData = albums && this.pagination()

    return (
      <Segment.Group>
        <Segment className="artistPageSegment" {...{ loading }}>
          {albumsListData}
        </Segment>

        <Segment className="artistPagePaginationWrap">{paginationData}</Segment>
      </Segment.Group>
    )
  }

  pagination () {
    const { totalPages } = this.state

    const handlePageChange = (_, { activePage }) => {
      this.setState({ currentPage: activePage })
      this.getData(activePage)
    }

    const paginationProps = {
      totalPages: totalPages,
      onPageChange: handlePageChange,
      firstItem: null,
      lastItem: null,
      siblingRange: 0
    }

    return <Pagination {...paginationProps} />
  }

  render () {
    const { loading, albums, error } = this.state

    const albumsData = albums && this.albumsList()

    const errorData = error && <ErrorData {...{ error }} />

    const loaderData = loading && (
      <Dimmer active inverted className="fixed" content={<Loader inverted />} />
    )

    const content = albumsData || errorData || loaderData

    return <React.Fragment>{content}</React.Fragment>
  }
}
