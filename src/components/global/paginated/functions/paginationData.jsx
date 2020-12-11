import React from 'react'
import Pagination from 'global/Pagination'

export default function paginationData () {
  const { clientPageLimit, isLoading, error, dataName } = this.props

  const totalPages = Math.ceil(this.totalItems() / clientPageLimit)
  const isDisabled = isLoading || !!error

  const handlePageChange = clientPage => {
    const { scrollToTop } = this.props

    const isLast = clientPage === totalPages
    const isForward = !isLast && clientPage > this.state.clientPage

    this.setState({ ...{ clientPage, isForward, isLast } })

    scrollToTop(dataName)
  }

  const paginationProps = { totalPages, isDisabled, handlePageChange }

  return <Pagination {...paginationProps} />
}
