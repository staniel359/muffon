import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import requestData from './functions/requestData'

export default class Album extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {}

    this.requestData = requestData.bind(this)
  }

  render () {
    const { isSelected, isOnlyTitle, album } = this.props
    const { artist, title } = album

    const fullTitle = isOnlyTitle ? title : `${artist} - ${title}`

    const handleClick = () => {
      const { setSelectedAlbum, index } = this.props

      const requestData = this.requestData()

      setSelectedAlbum({ index, fullTitle, requestData })
    }

    return (
      <Dropdown.Item
        active={isSelected}
        selected={isSelected}
        text={fullTitle}
        onClick={handleClick}
      />
    )
  }
}
