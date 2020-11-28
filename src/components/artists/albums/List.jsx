import React from 'react'
import { HashRouter as Router } from 'react-router-dom'
import { Card } from 'semantic-ui-react'
import Album from '../show/albums/Album'
import { v4 as uuid } from 'uuid'

export default class List extends React.PureComponent {
  render () {
    const { albums, artistName } = this.props

    const albumData = album => {
      const key = uuid()
      const albumsProps = { artistName, album, key }

      return <Album {...albumsProps} />
    }
    const albumsListData = albums.map(albumData)

    return (
      <Router>
        <Card.Group centered itemsPerRow={3}>
          {albumsListData}
        </Card.Group>
      </Router>
    )
  }
}
