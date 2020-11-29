import React from 'react'
import ListSimilarArtist from './ListSimilarArtist'
import { v4 as uuid } from 'uuid'
import { Card } from 'semantic-ui-react'

export default class List extends React.PureComponent {
  render () {
    const { similar } = this.props

    const similarArtistData = artistName => {
      const key = uuid()
      const similarArtistProps = { artistName, key }

      return <ListSimilarArtist {...similarArtistProps} />
    }
    const similarListData = similar.map(similarArtistData)
    const similarData = similar.length > 0 && (
      <Card.Group itemsPerRow={4}>{similarListData}</Card.Group>
    )

    return <React.Fragment>{similarData}</React.Fragment>
  }
}
