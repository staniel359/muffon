import React from 'react'
import { Divider } from 'semantic-ui-react'
import Pagination from 'global/Pagination'

export default class Paginated extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { activePage: 1, collection: [] }
  }

  componentDidMount = () => this.setData()

  componentDidUpdate (prevProps, prevState) {
    this.handleCurrentPageChange(prevProps)
    this.handleCollectionChange(prevProps)
  }

  handleCurrentPageChange (prevProps) {
    const nextCurrentPage = this.props.currentPage
    const prevCurrentPage = prevProps.currentPage

    const pageChanged = nextCurrentPage !== prevCurrentPage

    pageChanged && this.setData()
  }

  handleCollectionChange (prevProps) {
    const { scrollToTop, collectionName } = this.props

    const nextCollection = this.props.collection
    const prevCollection = prevProps.collection

    const collectionChanged = nextCollection !== prevCollection

    collectionChanged && scrollToTop(collectionName)
  }

  setData () {
    const { currentPage } = this.props

    const placeholderData = () => {
      const { totalPages, currentPageLimit } = this.props

      const pagesArray = Array(totalPages)
      const pageIndexesArray = [...pagesArray.keys()]

      const collectionArray = Array(currentPageLimit).fill(null)
      const collectionIndexArray = (_, index) => [index + 1, collectionArray]

      const pagesCollectionsArray = pageIndexesArray.map(collectionIndexArray)

      const pagesCollectionsObject = Object.fromEntries(pagesCollectionsArray)

      return pagesCollectionsObject
    }

    const paginatedData = () => {
      const { collectionPaginated } = this.state

      return collectionPaginated
        ? { ...collectionPaginated }
        : placeholderData()
    }

    const collectionPaginated = paginatedData()
    collectionPaginated[currentPage] = this.props.collection

    const collection = Object.values(collectionPaginated).flat()

    this.setState({ ...{ collectionPaginated, collection } })
  }

  render () {
    const {
      loading,
      collectionName,
      activePageLimit,
      currentPageLimit,
      collectionList,
      itemsPerRow
    } = this.props

    const activePageCollection = () => {
      const { collection, activePage } = this.state

      const offset = (activePage - 1) * activePageLimit
      const limit = offset + activePageLimit

      return collection.slice(offset, limit).filter(a => a)
    }

    const collectionDataProps = {
      ...{
        [collectionName]: activePageCollection(),
        ...{ itemsPerRow }
      }
    }
    const collectionData = React.cloneElement(
      collectionList,
      collectionDataProps
    )

    const totalPages = Math.floor(
      (this.props.totalPages * currentPageLimit) / activePageLimit
    )

    const currentPageCollection = page => {
      const { collectionPaginated } = this.state

      const collection = collectionPaginated[page]

      return collection ? collection.filter(a => a) : []
    }

    const handlePageChange = activePage => {
      const { getData, scrollToTop, collectionName } = this.props

      const pagesNotMultiple = currentPageLimit % activePageLimit > 0
      const forward = activePage > this.state.activePage
      const page = pagesNotMultiple && forward ? activePage : activePage - 1

      const currentPage =
        Math.floor((page * activePageLimit) / currentPageLimit) + 1

      const noCurrentPageCollection =
        currentPageCollection(currentPage).length === 0

      noCurrentPageCollection && getData(currentPage)

      this.setState({ ...{ activePage } })

      scrollToTop(collectionName)
    }

    const paginationProps = { totalPages, loading, handlePageChange }
    const paginationData = <Pagination {...paginationProps} />

    return (
      <React.Fragment>
        {collectionData}

        <Divider />

        {paginationData}
      </React.Fragment>
    )
  }
}
