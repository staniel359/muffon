import React from 'react'
import List from './List'
import { Divider } from 'semantic-ui-react'
import Pagination from 'global/Pagination'

export default class TracksData extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { activePage: 1, tracks: [] }
  }

  componentDidMount = () => this.setTracksData()

  componentDidUpdate (prevProps, prevState) {
    this.handleCurrentPageChange(prevProps)
    this.handleTracksLoadComplete(prevProps)
  }

  activePageLimit = 10
  currentPageLimit = 50

  handleCurrentPageChange (prevProps) {
    const nextCurrentPage = this.props.currentPage
    const prevCurrentPage = prevProps.currentPage

    const pageChanged = nextCurrentPage !== prevCurrentPage

    pageChanged && this.setTracksData()
  }

  handleTracksLoadComplete (prevProps) {
    const nextTracks = this.props.tracks
    const prevTracks = prevProps.tracks

    const tracksLoaded = nextTracks !== prevTracks

    tracksLoaded && this.props.scrollToTop('tracks')
  }

  setTracksData () {
    const { currentPage } = this.props

    const placeholderData = () => {
      const { totalPages } = this.props

      const pagesArray = [...Array(totalPages).keys()]
      const tracksArray = Array(this.currentPageLimit).fill(null)
      const tracksIndexArray = (_, index) => [index + 1, tracksArray]

      return Object.fromEntries(pagesArray.map(tracksIndexArray))
    }

    const paginatedData = () => {
      const { tracksPaginated } = this.state

      return tracksPaginated ? { ...tracksPaginated } : placeholderData()
    }

    const tracksPaginated = paginatedData()
    tracksPaginated[currentPage] = this.props.tracks

    const tracks = Object.values(tracksPaginated).flat()

    this.setState({ ...{ tracksPaginated, tracks } })
  }

  render () {
    const { loading } = this.props

    const activePageTracks = () => {
      const { tracks, activePage } = this.state

      const offset = (activePage - 1) * this.activePageLimit
      const limit = offset + this.activePageLimit

      return tracks.slice(offset, limit).filter(a => a)
    }

    const tracks = activePageTracks()
    const tracksDataProps = { tracks }

    const totalPages = Math.floor(
      (this.props.totalPages * this.currentPageLimit) / this.activePageLimit
    )

    const currentPageTracks = page => {
      const { tracksPaginated } = this.state

      const tracks = tracksPaginated[page]

      return tracks ? tracks.filter(a => a) : []
    }

    const handlePageChange = activePage => {
      const { getData, scrollToTop } = this.props

      const page = activePage - 1
      const currentPage =
        Math.floor((page * this.activePageLimit) / this.currentPageLimit) + 1
      const noCurrentPageTracks = currentPageTracks(currentPage).length === 0

      noCurrentPageTracks && getData(currentPage)

      this.setState({ ...{ activePage } })

      scrollToTop('tracks')
    }

    const paginationProps = { totalPages, loading, handlePageChange }

    return (
      <React.Fragment>
        <List {...tracksDataProps} />

        <Divider />

        <Pagination {...paginationProps} />
      </React.Fragment>
    )
  }
}
