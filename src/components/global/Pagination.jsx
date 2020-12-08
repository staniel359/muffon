import React from 'react'
import { Pagination } from 'semantic-ui-react'

export default class PaginationData extends React.PureComponent {
  render () {
    const { totalPages, isDisabled } = this.props

    const handlePageChange = (_, { activePage }) => {
      this.props.handlePageChange(activePage)
    }

    const paginationProps = {
      totalPages: totalPages,
      onPageChange: handlePageChange,
      firstItem: null,
      lastItem: null,
      siblingRange: 0,
      disabled: isDisabled
    }

    return (
      <div className="paginationWrap">
        <Pagination {...paginationProps} />
      </div>
    )
  }
}
