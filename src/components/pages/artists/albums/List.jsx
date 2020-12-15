import React from 'react'
import { Card } from 'semantic-ui-react'
import Album from './Album'
import { v4 as uuid } from 'uuid'

export default class List extends React.PureComponent {
  render () {
    const { albums, artistName, itemsPerRow, isLoading } = this.props

    const albumData = album => {
      const key = uuid()
      const albumsProps = { artistName, album, key, isLoading }

      return <Album {...albumsProps} />
    }
    const albumsData = albums.map(albumData)

    return <Card.Group {...{ itemsPerRow }}>{albumsData}</Card.Group>
  }
}
