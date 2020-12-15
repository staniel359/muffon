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
      children,
      hideSearch
    } = this.props

    const collectionData = clientPageCollection.filter(e => e)
    const collectionProps = {
      [dataName]: collectionData,
      itemsPerRow,
      artistName,
      topTrackCount,
      isLoading,
      hideSearch
    }

    const contentData =
      collectionData.length > 0 && React.cloneElement(children, collectionProps)

    return <React.Fragment>{contentData}</React.Fragment>
  }
}
