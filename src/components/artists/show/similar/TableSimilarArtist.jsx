import React from 'react'
import { v4 as uuid } from 'uuid'
import { Segment, Image, Header, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class TableSimilarArtist extends React.PureComponent {
  render () {
    const { artist } = this.props

    const src = artist.images.medium
    const imageData = (
      <Image wrapped rounded className="similarTableItemImage" {...{ src }} />
    )

    const artistNameEncoded = encodeURIComponent(artist.name)
    const similarArtistPageLink = `/artists/${artistNameEncoded}`
    const nameData = (
      <Header as="h2" className="similarTableItemArtistName">
        <Link to={similarArtistPageLink}>{artist.name}</Link>
      </Header>
    )

    const tagData = tag => (
      <Label key={uuid()} as={Link} to={`/tags/${tag}`} content={tag} />
    )
    const tagsData = artist.tags.map(tagData)
    const tagsViewMoreData = <Label as="a" content="..." />
    const tagsListData = (
      <Label.Group size="large">
        {tagsData}
        {tagsViewMoreData}
      </Label.Group>
    )

    const listenersCount = artist.listeners_count.toLocaleString('eu')
    const countersData = (
      <Label.Group size="large">
        <Label basic icon="user" content={listenersCount} />
      </Label.Group>
    )

    const description = artist.description || 'No description.'
    const descriptionData = <div>{description}</div>

    const contentData = (
      <Segment className="similarTableItemContent">
        {nameData}
        {tagsListData}
        {countersData}
        {descriptionData}
      </Segment>
    )

    return (
      <div className="similarTableItem">
        {imageData}
        {contentData}
      </div>
    )
  }
}
