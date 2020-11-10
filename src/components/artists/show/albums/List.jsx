import React from 'react'
import { HashRouter as Router } from 'react-router-dom'
import { Card } from 'semantic-ui-react'
import Album from './Album'
import { v4 as uuid } from 'uuid'

export default class List extends React.PureComponent {
  render () {
    const { albums, artistName } = this.props

    const albumData = album => <Album key={uuid()} {...{ artistName, album }} />
    const albumsList = albums.map(albumData)

    return (
      <Router>
        <Card.Group centered itemsPerRow={2}>
          {albumsList}
        </Card.Group>
      </Router>
    )
  }
}
