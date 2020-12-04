import React from 'react'
import List from './List'
import { Divider } from 'semantic-ui-react'
import Pagination from 'global/Pagination'

export default class AlbumsData extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { activePage: 1, albums: [] }
  }

  componentDidMount = () => this.setAlbumsData()

  componentDidUpdate (prevProps, prevState) {
    this.handleCurrentPageChange(prevProps)
    this.handleAlbumsLoadComplete(prevProps)
  }

  activePageLimit = 4
  currentPageLimit = 20

  handleCurrentPageChange (prevProps) {
    const nextCurrentPage = this.props.currentPage
    const prevCurrentPage = prevProps.currentPage

    const pageChanged = nextCurrentPage !== prevCurrentPage

    pageChanged && this.setAlbumsData()
  }

  handleAlbumsLoadComplete (prevProps) {
    const nextAlbums = this.props.albums
    const prevAlbums = prevProps.albums

    const albumsLoaded = nextAlbums !== prevAlbums

    albumsLoaded && this.props.scrollToTop('albums')
  }

  setAlbumsData () {
    const { currentPage } = this.props

    const placeholderData = () => {
      const { totalPages } = this.props

      const pagesArray = [...Array(totalPages).keys()]
      const albumsArray = Array(this.currentPageLimit).fill(null)
      const albumsIndexArray = (_, index) => [index + 1, albumsArray]

      return Object.fromEntries(pagesArray.map(albumsIndexArray))
    }

    const paginatedData = () => {
      const { albumsPaginated } = this.state

      return albumsPaginated ? { ...albumsPaginated } : placeholderData()
    }

    const albumsPaginated = paginatedData()
    albumsPaginated[currentPage] = this.props.albums

    const albums = Object.values(albumsPaginated).flat()

    this.setState({ ...{ albumsPaginated, albums } })
  }

  render () {
    const { loading } = this.props

    const activePageAlbums = () => {
      const { albums, activePage } = this.state

      const offset = (activePage - 1) * this.activePageLimit
      const limit = offset + this.activePageLimit

      return albums.slice(offset, limit).filter(a => a)
    }

    const albums = activePageAlbums()
    const albumsDataProps = { albums }

    const totalPages = Math.floor(
      (this.props.totalPages * this.currentPageLimit) / this.activePageLimit
    )

    const currentPageAlbums = page => {
      const { albumsPaginated } = this.state

      const albums = albumsPaginated[page]

      return albums ? albums.filter(a => a) : []
    }

    const handlePageChange = activePage => {
      const { getData, scrollToTop } = this.props

      const page = activePage - 1
      const currentPage =
        Math.floor((page * this.activePageLimit) / this.currentPageLimit) + 1
      const noCurrentPageAlbums = currentPageAlbums(currentPage).length === 0

      noCurrentPageAlbums && getData(currentPage)

      this.setState({ ...{ activePage } })

      scrollToTop('albums')
    }

    const paginationProps = { totalPages, loading, handlePageChange }

    return (
      <React.Fragment>
        <List {...albumsDataProps} />

        <Divider />

        <Pagination {...paginationProps} />
      </React.Fragment>
    )
  }
}
