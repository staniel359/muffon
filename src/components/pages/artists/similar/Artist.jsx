import React from 'react'
import { Link } from 'react-router-dom'
import { Segment, Image, Header, Label } from 'semantic-ui-react'
import Tags from 'global/Tags'

export default class Artist extends React.PureComponent {
  imageData () {
    const { artist } = this.props

    const image = artist.images.small

    return (
      <Link className="similarCardImage" to={this.similarArtistPageLink()}>
        <Image rounded src={image} />
      </Link>
    )
  }

  similarArtistPageLink () {
    const { artist } = this.props

    const artistNameEncoded = encodeURIComponent(artist.name)

    return `/artists/${artistNameEncoded}`
  }

  contentData () {
    const { tags, description } = this.props.artist

    const tagsData = tags.length > 0 && this.tagsData()

    const descriptionData = <div>{description}</div>

    return (
      <Segment className="similarCardContent">
        {this.nameData()}
        {tagsData}
        {this.countersData()}
        {descriptionData}
      </Segment>
    )
  }

  nameData () {
    const { artist } = this.props

    return (
      <Header as="h2" className="similarCardMainLink">
        <Link to={this.similarArtistPageLink()}>{artist.name}</Link>
      </Header>
    )
  }

  tagsData () {
    const { tags } = this.props.artist

    const tagsPageLink = `${this.similarArtistPageLink()}/tags`
    const tagsProps = { tags, isViewMore: true, link: tagsPageLink }

    return <Tags {...tagsProps} />
  }

  countersData () {
    const { artist } = this.props

    const listenersCount = artist.listeners_count.toLocaleString('eu')

    return (
      <Label.Group size="large">
        <Label basic icon="user" content={listenersCount} />
      </Label.Group>
    )
  }

  render () {
    return (
      <div className="similarCard">
        {this.imageData()}
        {this.contentData()}
      </div>
    )
  }
}
