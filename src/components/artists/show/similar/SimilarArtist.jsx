import React from 'react'
import { Header, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Picture from '../Picture'

export default class SimilarArtist extends React.Component {
  similarLink () {
    return `/artists/${this.artistName}`
  }

  artistName = encodeURIComponent(this.props.artistName)

  render () {
    return (
      <Card as={Link} to={this.similarLink()} className="artistPageSimilarCard">
        <Picture artistName={this.props.artistName} />

        <Header as="h4" className="artistPageSimilarName">
          {this.props.artistName}
        </Header>
      </Card>
    )
  }
}
