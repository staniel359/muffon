import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import Album from './albums/Album'

export default class Albums extends React.PureComponent {
  textData () {
    const { selectedAlbum } = this.props

    return selectedAlbum ? selectedAlbum.fullTitle : 'Select album'
  }

  albumsData () {
    const { albums } = this.props

    return albums.map(this.albumData)
  }

  albumData = (album, index) => {
    const {
      selectedAlbum,
      isOnlyTitle,
      setSelectedAlbum,
      selectedSourceId,
      selectedTypeId
    } = this.props

    const isSelected = !!selectedAlbum && index === selectedAlbum.index
    const sourceId = selectedSourceId
    const typeId = selectedTypeId

    const albumProps = {
      key: index,
      isSelected,
      isOnlyTitle,
      album,
      setSelectedAlbum,
      index,
      sourceId,
      typeId
    }

    return <Album {...albumProps} />
  }

  render () {
    return (
      <Dropdown
        button
        fluid
        selection
        text={this.textData()}
        options={this.albumsData()}
      />
    )
  }
}
