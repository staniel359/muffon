import React from 'react'
import { Card, Header, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class Artist extends React.PureComponent {
  artistPageLink () {
    const { artist } = this.props

    const artistNameEncoded = encodeURIComponent(artist.name)

    return `/artists/${artistNameEncoded}`
  }

  contentData () {
    const { artist } = this.props

    const headerData = (
      <Header as="h3" className="cardLightMainHeader" content={artist.name} />
    )

    return (
      <React.Fragment>
        <div />
        {this.imageData()}
        {headerData}
        {this.listenersCountData()}
      </React.Fragment>
    )
  }

  imageData () {
    const { images } = this.props.artist

    const image = images.small

    return (
      <Image
        wrapped
        circular
        size="small"
        className="imageWrapBordered"
        src={image}
      />
    )
  }

  listenersCountData () {
    const { artist } = this.props

    const listenersCount = artist.listeners_count.toLocaleString('eu')
    const listenersCountData = `${listenersCount} listeners`

    return (
      <Card.Content>
        <Card.Description>{listenersCountData}</Card.Description>
      </Card.Content>
    )
  }

  render () {
    return (
      <Card
        className="cardLight"
        as={Link}
        to={this.artistPageLink()}
        content={this.contentData()}
      />
    )
  }
}
