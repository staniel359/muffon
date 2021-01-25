import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import albumRequestData from './functions/albumRequestData'

export default class Albums extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {}

    this.albumRequestData = albumRequestData.bind(this)
  }

  textData () {
    const { selectedAlbum } = this.props

    return selectedAlbum ? selectedAlbum.fullTitle : 'Select album'
  }

  albumsData () {
    const { albums } = this.props

    return albums.map(this.albumData)
  }

  albumData = (album, index) => {
    const { selectedAlbum } = this.props

    const isSelected = !!selectedAlbum && index === selectedAlbum.index

    const imageData = {
      className: 'dropdownItemImage',
      src: album.images.extrasmall,
      rounded: true,
      wrapped: true
    }

    const fullTitle = () => {
      const { isOnlyTitle } = this.props
      const { artist, title } = album

      return isOnlyTitle ? title : `${artist.name} - ${title}`
    }

    const handleClick = () => {
      const { setSelectedAlbum } = this.props

      const requestData = this.albumRequestData({ album })

      setSelectedAlbum({ index, fullTitle: fullTitle(), requestData })
    }

    return {
      key: index,
      className: 'dropdownItem',
      active: isSelected,
      selected: isSelected,
      image: imageData,
      text: fullTitle(),
      onClick: handleClick
    }
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
