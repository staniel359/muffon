import React from 'react'
import { Segment, Image, Header, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Tags from 'global/Tags'

export default class Artist extends React.PureComponent {
  render () {
    const { artist } = this.props
    const { name, tags, description } = artist

    const artistNameEncoded = encodeURIComponent(name)
    const similarArtistPageLink = `/artists/${artistNameEncoded}`

    const src = artist.images.small
    const imageData = (
      <Link className="similarCardImage" to={similarArtistPageLink}>
        <Image rounded {...{ src }} />
      </Link>
    )

    const nameData = (
      <Header as="h2" className="similarCardMainLink">
        <Link to={similarArtistPageLink}>{name}</Link>
      </Header>
    )

    const tagsPageLink = `/artists/${artistNameEncoded}/tags`
    const tagsProps = { tags: tags, viewMore: true, link: tagsPageLink }

    const listenersCount = artist.listeners_count.toLocaleString('eu')
    const countersData = (
      <Label.Group size="large">
        <Label basic icon="user" content={listenersCount} />
      </Label.Group>
    )

    const descriptionData = <div>{description || 'No description.'}</div>

    const contentData = (
      <Segment className="similarCardContent">
        {nameData}
        <Tags {...tagsProps} />
        {countersData}
        {descriptionData}
      </Segment>
    )

    return (
      <div className="similarCard">
        {imageData}
        {contentData}
      </div>
    )
  }
}
