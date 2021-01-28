import React from 'react'
import { v4 as uuid } from 'uuid'
import { Link } from 'react-router-dom'
import { Card, Header, Image } from 'semantic-ui-react'

export default class Artist extends React.PureComponent {
  contentData () {
    const { artist } = this.props

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
      <Header as="h4" className="cardLightMainHeader" content={artist.name} />
    )

    return (
      <React.Fragment>
        <div />
        {imageData}
        {headerData}
      </React.Fragment>
    )
  }

  render () {
    const { artist } = this.props

    const artistNameEncoded = encodeURIComponent(artist.name)
    const artistPageLink = `/artists/${artistNameEncoded}`

    return (
      <Card
        className="cardLight"
        key={uuid()}
        as={Link}
        to={artistPageLink}
        content={this.contentData()}
      />
    )
  }
}
