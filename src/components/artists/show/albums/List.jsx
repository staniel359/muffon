import React from 'react'
import { HashRouter as Router } from 'react-router-dom'
import { Card } from 'semantic-ui-react'
import Album from './Album'
import { v4 as uuid } from 'uuid'

export default class List extends React.PureComponent {
  render () {
    const { albums, artistName, itemsPerRow } = this.props

    const albumData = album => {
      const key = uuid()
      const albumsProps = { artistName, album, key }

      return <Album {...albumsProps} />
    }
    const albumsListData = albums.map(albumData)
    const albumsData = albums.length > 0 && (
      <Router>
        <Card.Group centered {...{ itemsPerRow }}>
          {albumsListData}
        </Card.Group>
      </Router>
    )

    return <React.Fragment>{albumsData}</React.Fragment>
  }
}
