import React from 'react'
import { HashRouter as Router } from 'react-router-dom'
import { Card } from 'semantic-ui-react'
import Album from './Album'
import { v4 as uuid } from 'uuid'

export default class List extends React.PureComponent {
  albumData = album => {
    const { artistName } = this.props
    const key = uuid()

    return <Album {...{ key, artistName, album }} />
  }

  render () {
    const { albums } = this.props
    const albumsList = albums.map(this.albumData)

    return (
      <Router>
        <Card.Group centered itemsPerRow={2}>
          {albumsList}
        </Card.Group>
      </Router>
    )
  }
}
