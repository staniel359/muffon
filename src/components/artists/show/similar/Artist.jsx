import React from 'react'
import { Card, Header, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

export default class Artist extends React.PureComponent {
  render () {
    const { artist } = this.props

    const artistName = artist.name
    const artistNameEncoded = encodeURIComponent(artistName)
    const artistPageLink = `/artists/${artistNameEncoded}`

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
      <Header as="h4" className="cardLightMainHeader" content={artistName} />
    )

    const contentData = (
      <React.Fragment>
        <div />
        {imageData}
        {headerData}
      </React.Fragment>
    )

    return (
      <Card
        key={uuid()}
        as={Link}
        to={artistPageLink}
        className="cardLight"
        content={contentData}
      />
    )
  }
}
