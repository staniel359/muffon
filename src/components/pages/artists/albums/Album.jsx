import React from 'react'
import { Card, Image, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import ListenersCount from 'global/artists/albums/ListenersCount'

export default class Album extends React.PureComponent {
  albumPageLink () {
    const { artistName, album } = this.props

    const artistNameEncoded = encodeURIComponent(artistName)
    const albumTitleEncoded = encodeURIComponent(album.title)

    return `/artists/${artistNameEncoded}/albums/${albumTitleEncoded}`
  }

  contentData () {
    const { album, isLoading } = this.props

    const image = album.images.small
    const imageData = (
      <Image rounded wrapped className="imageWrapBordered" src={image} />
    )

    const headerData = (
      <Header as="h4" className="cardLightMainHeader" content={album.title} />
    )

    const listenersCountData = !isLoading && this.listenersCountData()

    return (
      <React.Fragment>
        <div />
        {imageData}
        {headerData}
        {listenersCountData}
      </React.Fragment>
    )
  }

  listenersCountData () {
    const { artistName, album } = this.props

    const albumTitle = album.title
    const listenersCountProps = { artistName, albumTitle }

    return (
      <Card.Content>
        <Card.Description>
          <ListenersCount {...listenersCountProps} />
        </Card.Description>
      </Card.Content>
    )
  }

  render () {
    return (
      <Card
        className="cardLight"
        as={Link}
        to={this.albumPageLink()}
        content={this.contentData()}
      />
    )
  }
}
