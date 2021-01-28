import React from 'react'

export default function collectionData () {
  const { clientPageCollection } = this.state

  const collectionData = clientPageCollection.filter(e => e)

  const childrenData = () => {
    const {
      children,
      dataName,
      itemsPerRow,
      artistName,
      topTrackCount,
      isLoading,
      hideSearch
    } = this.props

    const childrenProps = {
      [dataName]: collectionData,
      itemsPerRow,
      artistName,
      topTrackCount,
      isLoading,
      hideSearch
    }

    return React.cloneElement(children, childrenProps)
  }

  const contentData = collectionData.length > 0 && childrenData()

  return <React.Fragment>{contentData}</React.Fragment>
}
