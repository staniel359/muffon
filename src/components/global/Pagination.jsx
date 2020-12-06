import React from 'react'
import { Pagination } from 'semantic-ui-react'

export default class PaginationData extends React.PureComponent {
  render () {
    const { totalPages, isLoading } = this.props

    const handlePageChange = (_, { activePage }) => {
      this.setState({ currentPage: activePage })

      this.props.handlePageChange(activePage)
    }

    const paginationProps = {
      totalPages: totalPages,
      onPageChange: handlePageChange,
      firstItem: null,
      lastItem: null,
      siblingRange: 0,
      disabled: isLoading
    }

    return (
      <div className="paginationWrap">
        <Pagination {...paginationProps} />
      </div>
    )
  }
}
