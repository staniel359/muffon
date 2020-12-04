import React from 'react'
import { Pagination } from 'semantic-ui-react'

export default class PaginationData extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { totalPages, loading } = this.props

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
      disabled: loading
    }

    return (
      <div className="paginationWrap">
        <Pagination {...paginationProps} />
      </div>
    )
  }
}
