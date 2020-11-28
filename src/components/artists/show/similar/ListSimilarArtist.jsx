import React from 'react'
import { Card, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import Picture from 'global/artists/Picture'

export default class ListSimilarArtist extends React.PureComponent {
  render () {
    const { artistName } = this.props

    const artistNameEncoded = encodeURIComponent(artistName)
    const similarArtistPageLink = `/artists/${artistNameEncoded}`

    return (
      <Card
        key={uuid()}
        as={Link}
        to={similarArtistPageLink}
        className="artistPageCard"
      >
        <div />

        <Picture border medium {...{ artistName }} />

        <Header as="h4" content={artistName} />
      </Card>
    )
  }
}
