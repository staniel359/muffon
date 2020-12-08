import React from 'react'
import { v4 as uuid } from 'uuid'
import { Card } from 'semantic-ui-react'
import Artist from './Artist'

export default class List extends React.PureComponent {
  render () {
    const { artists, itemsPerRow } = this.props

    const artistData = artist => {
      const key = uuid()
      const artistProps = { artist, key }

      return <Artist {...artistProps} />
    }
    const artistsListData = artists.map(artistData)
    const artistsData = artists.length > 0 && (
      <Card.Group {...{ itemsPerRow }}>{artistsListData}</Card.Group>
    )

    return <React.Fragment>{artistsData}</React.Fragment>
  }
}
