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

    const image = album.images.small
    const imageData = (
      <Image rounded wrapped className="imageWrapBordered" src={image} />
    )

    const headerData = (
      <Header as="h4" className="cardLightMainHeader" content={albumTitle} />
    )

    const listenersCountProps = { artistName, albumTitle }
    const listenersCountData = (
      <Card.Content>
        <Card.Description>
          <ListenersCount {...listenersCountProps} />
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
        to={albumPageLink}
        content={contentData}
      />
    )
  }
}
