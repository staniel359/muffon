import React from 'react'
import { v4 as uuid } from 'uuid'
import { Card } from 'semantic-ui-react'
import Album from './Album'

export default class List extends React.PureComponent {
  render () {
    const { albums } = this.props

    const albumData = album => {
      const key = uuid()
      const albumProps = { album, key }

      return <Album {...albumProps} />
    }
    const albumsListData = albums.map(albumData)
    const albumsData = albums.length > 0 && (
      <Card.Group itemsPerRow={4}>{albumsListData}</Card.Group>
    )

    return <React.Fragment>{albumsData}</React.Fragment>
  }
}
