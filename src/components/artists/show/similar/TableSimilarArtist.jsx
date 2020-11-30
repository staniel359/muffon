import React from 'react'
import { v4 as uuid } from 'uuid'
import { Segment, Image, Header, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class TableSimilarArtist extends React.PureComponent {
  render () {
    const { artist } = this.props
    const { tags, description } = artist

    const artistName = artist.name
    const artistNameEncoded = encodeURIComponent(artistName)
    const similarArtistPageLink = `/artists/${artistNameEncoded}`

    const src = artist.images.medium
    const imageData = (
      <Link className="similarTableItemImage" to={similarArtistPageLink}>
        <Image rounded {...{ src }} />
      </Link>
    )

    const nameData = (
      <Header as="h2" className="similarTableItemArtistName">
        <Link to={similarArtistPageLink}>{artistName}</Link>
      </Header>
    )

    const tagData = tag => (
      <Label key={uuid()} as={Link} to={`/tags/${tag}`} content={tag} />
    )
    const tagsData = tags.map(tagData)

    const tagsPageLink = `/artists/${artistNameEncoded}/tags`
    const tagsViewMoreData = tags.length > 0 && (
      <Label as={Link} to={tagsPageLink} content="..." />
    )

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

    const descriptionData = <div>{description || 'No description.'}</div>

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
