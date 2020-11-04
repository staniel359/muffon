import React from 'react'
import SimilarArtist from './SimilarArtist'
import { v4 as uuid } from 'uuid'
import { Card } from 'semantic-ui-react'

export default class List extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {}
  }

  similarData (artistName) {
    return <SimilarArtist key={uuid()} artistName={artistName} />
  }

  render () {
    return (
      <Card.Group itemsPerRow={4}>
        {this.props.similar.map(artistName => this.similarData(artistName))}
      </Card.Group>
    )
  }
}
