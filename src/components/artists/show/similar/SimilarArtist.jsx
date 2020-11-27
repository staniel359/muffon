import React from 'react'
import { Header, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Picture from 'global/artists/Picture'

export default class SimilarArtist extends React.PureComponent {
  render () {
    const { artistName } = this.props

    const artistNameEncoded = encodeURIComponent(artistName)
    const pageLink = `/artists/${artistNameEncoded}`

    return (
      <Card as={Link} to={pageLink} className="artistPageCard">
        <div />

        <Picture border medium {...{ artistName }} />

        <Header as="h4" content={artistName} />
      </Card>
    )
  }
}
