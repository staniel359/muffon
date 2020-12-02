import React from 'react'
import List from './List'
import { Pagination, Divider } from 'semantic-ui-react'

export default class ArtistsData extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { forward: true, activePage: 1, artists: [] }
  }

  componentDidMount = () => this.setArtistsData()

  componentDidUpdate (prevProps, prevState) {
    this.handleActivePageChange(prevState)
    this.handleCurrentPageChange(prevProps)
    this.handleArtistsLoadComplete(prevProps)
  }

  activePageLimit = 4
  currentPageLimit = 21

  handleActivePageChange (prevState) {
    const nextActivePage = this.state.activePage
    const prevActivePage = prevState.activePage

    const pageChanged = nextActivePage !== prevActivePage

    const setNewDirection = () => {
      const forward = nextActivePage > prevActivePage
      const directionChanged = this.state.forward !== forward

      directionChanged && this.setState({ ...{ forward } })
    }

    pageChanged && setNewDirection()
  }

  handleCurrentPageChange (prevProps) {
    const nextCurrentPage = this.props.currentPage
    const prevCurrentPage = prevProps.currentPage

    const pageChanged = nextCurrentPage !== prevCurrentPage

    pageChanged && this.setArtistsData()
  }

  handleArtistsLoadComplete (prevProps) {
    const nextArtists = this.props.artists
    const prevArtists = prevProps.artists

    const artistsLoaded = nextArtists !== prevArtists

    artistsLoaded && this.props.scrollToTop()
  }

  setArtistsData () {
    const { currentPage } = this.props

    const placeholderData = () => {
      const { totalPages } = this.props

      const pagesArray = [...Array(totalPages).keys()]
      const artistsArray = Array(this.currentPageLimit).fill(null)
      const artistsIndexArray = (_, index) => [index + 1, artistsArray]

      return Object.fromEntries(pagesArray.map(artistsIndexArray))
    }

    const paginatedData = () => {
      const { artistsPaginated } = this.state

      return artistsPaginated ? { ...artistsPaginated } : placeholderData()
    }

    const artistsPaginated = paginatedData()
    artistsPaginated[currentPage] = this.props.artists

    const artists = Object.values(artistsPaginated).flat()

    this.setState({ ...{ artistsPaginated, artists } })
  }

  pagination () {
    const { totalPages, loading } = this.props

    const totalPagesCount = Math.floor(
      (totalPages * this.currentPageLimit) / this.activePageLimit
    )

    const currentPageArtists = page => {
      const { artistsPaginated } = this.state

      const artists = artistsPaginated[page]

      return artists ? artists.filter(a => a) : []
    }

    const handlePageChange = (_, { activePage }) => {
      const { forward } = this.state
      const { getData } = this.props

      const page = forward ? activePage : activePage - 1
      const currentPage =
        Math.floor((page * this.activePageLimit) / this.currentPageLimit) + 1
      const noCurrentPageArtists = currentPageArtists(currentPage).length === 0

      noCurrentPageArtists && getData(currentPage)

      this.setState({ ...{ activePage } })

      this.props.scrollToTop()
    }

    const paginationProps = {
      totalPages: totalPagesCount,
      onPageChange: handlePageChange,
      firstItem: null,
      lastItem: null,
      siblingRange: 0,
      disabled: loading
    }

    return (
      <div className="tagPagePaginationWrap">
        <Pagination {...paginationProps} />
      </div>
    )
  }

  render () {
    const activePageArtists = () => {
      const { artists, activePage } = this.state

      const offset = (activePage - 1) * this.activePageLimit
      const limit = offset + this.activePageLimit

      return artists.slice(offset, limit).filter(a => a)
    }

    const listProps = { artists: activePageArtists() }

    return (
      <React.Fragment>
        <List {...listProps} />

        <Divider />

        {this.pagination()}
      </React.Fragment>
    )
  }
}
