import React from 'react'
import { Card, Header, Image, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

export default class Album extends React.PureComponent {
  render () {
    const { album } = this.props

    const artistNameEncoded = encodeURIComponent(album.artist)
    const albumTitleEncoded = encodeURIComponent(album.title)
    const albumPageLink = `/artists/${artistNameEncoded}/albums/${albumTitleEncoded}`
    const coverData = (
      <Image
        wrapped
        rounded
        size="small"
        className="cardLightImage imageWrapBordered"
        src={album.cover}
        as={Link}
        to={albumPageLink}
      />
    )

    const albumPageLinkData = <Link to={albumPageLink}>{album.title}</Link>
    const headerData = (
      <Header
        as="h3"
        className="cardLightMainLink"
        content={albumPageLinkData}
      />
    )

    const artistPageLink = `/artists/${artistNameEncoded}`
    const artistPageLinkData = <Link to={artistPageLink}>{album.artist}</Link>
    const listenersCountData = (
      <div>
        <Icon name="user" size="small" />
        {album.listeners_count.toLocaleString('eu')}
      </div>
    )
    const contentData = (
      <Card.Content>
        <Card.Description content={artistPageLinkData} />
        <Card.Description content={listenersCountData} />
      </Card.Content>
    )

    return (
      <Card key={uuid()} className="cardLight">
        <div />
        {coverData}
        {headerData}
        {contentData}
      </Card>
    )
  }
}
