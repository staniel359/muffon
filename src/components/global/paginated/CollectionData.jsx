import React from 'react'

export default class CollectionData extends React.PureComponent {
  render () {
    const {
      dataName,
      clientPageCollection,
      itemsPerRow,
      artistName,
      topTrackCount,
      isLoading,
      children
    } = this.props

    const collectionListData = {
      [dataName]: clientPageCollection.filter(e => e)
    }
    const collectionProps = {
      ...collectionListData,
      itemsPerRow,
      artistName,
      topTrackCount,
      isLoading
    }

    return React.cloneElement(children, collectionProps)
  }
}
