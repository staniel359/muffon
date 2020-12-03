import React from 'react'
import { Card, Image, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import ListenersCount from 'global/artists/albums/ListenersCount'

export default class Album extends React.PureComponent {
  render () {
    const { album, artistName } = this.props

    const albumTitle = album.title

    const artistNameEncoded = encodeURIComponent(artistName)
    const albumTitleEncoded = encodeURIComponent(albumTitle)
    const albumPageLink = `/artists/${artistNameEncoded}/albums/${albumTitleEncoded}`

    const albumCover = album.covers.small
    const defaultCover =
      'https://lastfm.freetls.fastly.net/i/u/174s/' +
      'c6f59c1e5e7240a4c0d427abd71f3dbb.png'
    const cover = albumCover || defaultCover

    const imageData = (
      <Image
        rounded
        wrapped
        className="cardLightImage imageWrapBordered"
        src={cover}
        as={Link}
        to={albumPageLink}
      />
    )

    const albumPageLinkData = <Link to={albumPageLink}>{albumTitle}</Link>
    const headerData = (
      <Header
        as="h4"
        className="cardLightMainLink"
        content={albumPageLinkData}
      />
    )

    const listenersCountProps = { artistName, albumTitle }
    const listenersCountData = <ListenersCount {...listenersCountProps} />

    const contentData = (
      <Card.Content>
        <Card.Description content={listenersCountData} />
      </Card.Content>
    )

    return (
      <Card className="cardLight">
        <div />
        {imageData}
        {headerData}
        {contentData}
      </Card>
    )
  }
}
