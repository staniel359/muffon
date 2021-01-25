import React from 'react'
import { Card, Header, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class Album extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { isArtistHovered: false }
  }

  render () {
    const { album } = this.props
    const { isArtistHovered } = this.state

    const artistName = album.artist.name
    const artistNameEncoded = encodeURIComponent(artistName)
    const artistPageLink = `/artists/${artistNameEncoded}`

    const albumTitle = album.title
    const albumTitleEncoded = encodeURIComponent(albumTitle)
    const albumPageLink = `/artists/${artistNameEncoded}/albums/${albumTitleEncoded}`

    const albumOrArtistLink = isArtistHovered ? artistPageLink : albumPageLink

    const image = album.images.small
    const imageData = (
      <Image
        wrapped
        rounded
        size="small"
        className="imageWrapBordered"
        src={image}
      />
    )

    const albumTitleClassName = !isArtistHovered ? 'cardLightMainHeader' : ''
    const albumTitleData = (
      <Header as="h4" className={albumTitleClassName} content={albumTitle} />
    )

    const artistNameClassName = isArtistHovered ? 'cardLightMainHeader' : ''
    const toggleArtistHovered = bool =>
      this.setState({ isArtistHovered: !isArtistHovered })
    const artistNameData = (
      <Card.Description
        className={artistNameClassName}
        content={artistName}
        onMouseEnter={toggleArtistHovered}
        onMouseLeave={toggleArtistHovered}
      />
    )

    const listenersCountData = (
      <Card.Description>
        {album.listeners_count.toLocaleString('eu') + ' listeners'}
      </Card.Description>
    )

    const contentData = (
      <React.Fragment>
        <div />
        {imageData}
        {albumTitleData}
        <Card.Content>
          {artistNameData}
          {listenersCountData}
        </Card.Content>
      </React.Fragment>
    )

    return (
      <Card
        className="cardLight"
        as={Link}
        to={albumOrArtistLink}
        content={contentData}
      />
    )
  }
}
