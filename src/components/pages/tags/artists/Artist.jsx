import React from 'react'
import { Card, Header, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class Artist extends React.PureComponent {
  render () {
    const { artist } = this.props

    const artistName = artist.name
    const artistNameEncoded = encodeURIComponent(artistName)
    const artistPageLink = `/artists/${artistNameEncoded}`

    const image = artist.images.small
    const imageData = (
      <Image
        wrapped
        circular
        size="small"
        className="imageWrapBordered"
        src={image}
      />
    )

    const headerData = (
      <Header as="h3" className="cardLightMainHeader" content={artistName} />
    )

    const listenersCountData = (
      <Card.Content>
        <Card.Description>
          {artist.listeners_count.toLocaleString('eu') + ' listeners'}
        </Card.Description>
      </Card.Content>
    )

    const contentData = (
      <React.Fragment>
        <div />
        {imageData}
        {headerData}
        {listenersCountData}
      </React.Fragment>
    )

    return (
      <Card
        className="cardLight"
        as={Link}
        to={artistPageLink}
        content={contentData}
      />
    )
  }
}
