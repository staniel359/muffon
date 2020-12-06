import React from 'react'
import Pagination from 'global/Pagination'

export default class PaginationData extends React.PureComponent {
  handlePageChange = activePage => {
    const {
      clientCurrentPage,
      responsePageLimit,
      clientPageLimit,
      getData,
      collection,
      setClientCurrentPage,
      setForward,
      scrollToTop
    } = this.props

    const isForward = activePage > clientCurrentPage

    const getNextCollectionData = () => {
      const isMultiplePages = responsePageLimit % clientPageLimit === 0
      const clientNextPage =
        !isMultiplePages && isForward ? activePage : activePage - 1

      const responseNextPage =
        Math.floor((clientNextPage * clientPageLimit) / responsePageLimit) + 1

      getData(responseNextPage)
    }

    const pageCollection = collection[activePage] || []
    const isCollectionFull = pageCollection.length === clientPageLimit

    !isCollectionFull && getNextCollectionData()

    setClientCurrentPage(activePage)
    setForward(isForward)

    scrollToTop()
  }

  render () {
    const {
      responseTotalPages,
      responsePageLimit,
      clientPageLimit,
      loading
    } = this.props
    const { handlePageChange } = this

    const totalPages = Math.floor(
      (responseTotalPages * responsePageLimit) / clientPageLimit
    )

    const paginationProps = { totalPages, loading, handlePageChange }

    return <Pagination {...paginationProps} />
  }
}
