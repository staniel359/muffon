import React from 'react'
import { Card, Image, Icon, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import ListenersCount from './ListenersCount'

export default class Album extends React.PureComponent {
  render () {
    const { album, artistName, itemsPerRow } = this.props

    const albumTitle = album.title

    const artistNameEncoded = encodeURIComponent(artistName)
    const albumTitleEncoded = encodeURIComponent(albumTitle)
    const albumPageLink = `/artists/${artistNameEncoded}/albums/${albumTitleEncoded}`

    const albumCover = album.covers.medium
    const defaultCover =
      'https://lastfm.freetls.fastly.net/i/u/300x300/' +
      'c6f59c1e5e7240a4c0d427abd71f3dbb.png'
    const cover = albumCover || defaultCover

    const headerSize = itemsPerRow > 3 ? 'h4' : 'h3'

    const listenersCountProps = { artistName, albumTitle }
    const listenersCountData = <ListenersCount {...listenersCountProps} />

    return (
      <Card as={Link} to={albumPageLink} className="artistPageAlbumCard">
        <div />

        <Image rounded wrapped className="imageWrapBordered" src={cover} />

        <Header as={headerSize} content={albumTitle} />

        <Card.Content>
          <Card.Description>
            <Icon name="user" />
            {listenersCountData}
          </Card.Description>
        </Card.Content>
      </Card>
    )
  }
}
