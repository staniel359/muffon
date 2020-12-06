import React from 'react'

export default class List extends React.PureComponent {
  render () {
    const {
      collectionList,
      collectionName,
      itemsPerRow,
      collection,
      clientCurrentPage
    } = this.props

    const clientCurrentPageCollection = (
      collection[clientCurrentPage] || []
    ).filter(e => e)

    const collectionListDataProps = {
      ...{
        [collectionName]: clientCurrentPageCollection,
        ...{ itemsPerRow }
      }
    }

    return React.cloneElement(collectionList, collectionListDataProps)
  }
}
