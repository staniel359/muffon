import React from 'react'
import { Card, Header, Image, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

export default class Artist extends React.PureComponent {
  render () {
    const { artist } = this.props

    const artistNameEncoded = encodeURIComponent(artist.name)
    const artistPageLink = `/artists/${artistNameEncoded}`
    const artistPageLinkData = <Link to={artistPageLink}>{artist.name}</Link>
    const imageData = (
      <Image
        wrapped
        circular
        size="small"
        className="cardLightImage imageWrapBordered"
        src={artist.image}
        as={Link}
        to={artistPageLink}
      />
    )

    const headerData = (
      <Header
        as="h3"
        className="cardLightMainLink"
        content={artistPageLinkData}
      />
    )

    const listenersCountData = (
      <div>
        <Icon name="user" size="small" />
        {artist.listeners_count.toLocaleString('eu')}
      </div>
    )

    const contentData = (
      <Card.Content>
        <Card.Description content={listenersCountData} />
      </Card.Content>
    )

    return (
      <Card key={uuid()} className="cardLight">
        <div />
        {imageData}
        {headerData}
        {contentData}
      </Card>
    )
  }
}
