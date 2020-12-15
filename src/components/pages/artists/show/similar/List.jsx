import React from 'react'
import { v4 as uuid } from 'uuid'
import { Card } from 'semantic-ui-react'
import Artist from './Artist'

export default class List extends React.PureComponent {
  render () {
    const { similar, itemsPerRow } = this.props

    const artistData = artist => {
      const key = uuid()
      const artistProps = { artist, key }

      return <Artist {...artistProps} />
    }
    const artistsData = similar.map(artistData)

    return <Card.Group {...{ itemsPerRow }}>{artistsData}</Card.Group>
  }
}
