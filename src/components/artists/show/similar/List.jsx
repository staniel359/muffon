import React from 'react'
import SimilarArtist from './SimilarArtist'
import { v4 as uuid } from 'uuid'
import { Card } from 'semantic-ui-react'
import { HashRouter as Router } from 'react-router-dom'

export default class List extends React.PureComponent {
  render () {
    const { similar } = this.props

    const similarData = artistName => {
      const key = uuid()
      const similarArtistProps = { artistName, key }

      return <SimilarArtist {...similarArtistProps} />
    }
    const similarList = similar.map(similarData)

    return (
      <Router>
        <Card.Group itemsPerRow={4}>{similarList}</Card.Group>
      </Router>
    )
  }
}
