import React from 'react'
import SimilarArtist from './SimilarArtist'
import { v4 as uuid } from 'uuid'
import { Card } from 'semantic-ui-react'
import { HashRouter as Router } from 'react-router-dom'

export default class List extends React.PureComponent {
  similarData = artistName => {
    const artist = { name: artistName }
    const key = uuid()

    return <SimilarArtist {...{ key, artist }} />
  }

  render () {
    const { similar } = this.props
    const similarList = similar.map(this.similarData)

    return (
      <Router>
        <Card.Group itemsPerRow={4}>{similarList}</Card.Group>
      </Router>
    )
  }
}
