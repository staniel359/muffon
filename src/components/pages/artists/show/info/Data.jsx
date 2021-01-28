import React from 'react'
import { Header, Label, Divider } from 'semantic-ui-react'
import Tags from 'global/Tags'
import { Link } from 'react-router-dom'

export default class Data extends React.PureComponent {
  artistNameData () {
    const { artist } = this.props

    return (
      <Header as="h1" className="artistPageArtistName" content={artist.name} />
    )
  }

  tagsData () {
    const { artist } = this.props

    const artistNameEncoded = encodeURIComponent(artist.name)
    const tagsPageLink = `/artists/${artistNameEncoded}/tags`
    const tagsProps = {
      tags: artist.tags,
      isViewMore: true,
      link: tagsPageLink
    }

    return <Tags {...tagsProps} />
  }

  countersData () {
    const { artist } = this.props

    const listenersCount = artist.listeners_count.toLocaleString('eu')
    const playsCount = artist.plays_count.toLocaleString('eu')

    return (
      <Label.Group size="large">
        <Label basic icon="user" content={listenersCount} />
        <Label basic icon="music" content={playsCount} />
      </Label.Group>
    )
  }

  descriptionData () {
    const { artist } = this.props

    const artistNameEncoded = encodeURIComponent(artist.name)
    const descriptionPageLink = `/artists/${artistNameEncoded}/description`

    return (
      <React.Fragment>
        <Divider />

        <div>
          {artist.description}
          {'\u00A0'}
          <Link to={descriptionPageLink}>Read more...</Link>
        </div>
      </React.Fragment>
    )
  }

  render () {
    const { artist } = this.props

    const tagsData = artist.tags && this.tagsData()

    const descriptionData = artist.description && this.descriptionData()

    return (
      <React.Fragment>
        {this.artistNameData()}
        {tagsData}
        {this.countersData()}
        {descriptionData}
      </React.Fragment>
    )
  }
}
