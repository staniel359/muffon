import React from 'react'
import { HashRouter as Router } from 'react-router-dom'
import { Card } from 'semantic-ui-react'
import Album from './Album'
import { v4 as uuid } from 'uuid'

export default class List extends React.PureComponent {
  albumData (album) {
    return (
      <Album key={uuid()} album={album} artistName={this.props.artistName} />
    )
  }

  render () {
    return (
      <Router>
        <Card.Group itemsPerRow={2}>
          {this.props.albums.map(album => this.albumData(album))}
        </Card.Group>
      </Router>
    )
  }
}
