import React from 'react'
import { Card, Header, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class Album extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { isArtistHovered: false }
  }

  albumOrArtistLink () {
    const { isArtistHovered } = this.state
    const { album } = this.props

    const artistNameEncoded = encodeURIComponent(album.artist.name)
    const artistPageLink = `/artists/${artistNameEncoded}`

    const albumTitleEncoded = encodeURIComponent(album.title)
    const albumPageLink = `/artists/${artistNameEncoded}/albums/${albumTitleEncoded}`

    return isArtistHovered ? artistPageLink : albumPageLink
  }

  contentData () {
    return (
      <React.Fragment>
        <div />
        {this.imageData()}
        {this.albumTitleData()}
        <Card.Content>
          {this.artistNameData()}
          {this.listenersCountData()}
        </Card.Content>
      </React.Fragment>
    )
  }

  imageData () {
    const { album } = this.props

    const image = album.images.small

    return (
      <Image
        wrapped
        rounded
        size="small"
        className="imageWrapBordered"
        src={image}
      />
    )
  }

  albumTitleData () {
    const { isArtistHovered } = this.state
    const { album } = this.props

    const className = !isArtistHovered ? 'cardLightMainHeader' : ''

    return <Header as="h4" content={album.title} {...{ className }} />
  }

  artistNameData () {
    const { isArtistHovered } = this.state
    const { album } = this.props

    const toggleArtistHovered = () => {
      this.setState({ isArtistHovered: !isArtistHovered })
    }
    const className = isArtistHovered ? 'cardLightMainHeader' : ''

    return (
      <Card.Description
        content={album.artist.name}
        onMouseEnter={toggleArtistHovered}
        onMouseLeave={toggleArtistHovered}
        {...{ className }}
      />
    )
  }

  listenersCountData () {
    const { album } = this.props

    const listenersCount = album.listeners_count.toLocaleString('eu')
    const listenersCountData = `${listenersCount} listeners`

    return <Card.Description>{listenersCountData}</Card.Description>
  }

  render () {
    return (
      <Card
        className="cardLight"
        as={Link}
        to={this.albumOrArtistLink()}
        content={this.contentData()}
      />
    )
  }
}
