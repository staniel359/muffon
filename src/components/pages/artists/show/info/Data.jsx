import React from 'react'
import { Header, Label, Divider } from 'semantic-ui-react'
import Tags from 'global/Tags'

export default class Data extends React.PureComponent {
  render () {
    const { artist } = this.props
    const { name, tags, description } = artist

    const artistNameData = (
      <Header as="h1" className="artistPageArtistName" content={name} />
    )

    const tagsPageLink = `/artists/${this.artistNameEncoded}/tags`
    const tagsProps = { tags, viewMore: true, link: tagsPageLink }

    const listenersCount = artist.listeners_count.toLocaleString('eu')
    const playsCount = artist.plays_count.toLocaleString('eu')
    const countersData = (
      <Label.Group size="large">
        <Label basic icon="user" content={listenersCount} />
        <Label basic icon="music" content={playsCount} />
      </Label.Group>
    )

    const descriptionData = (
      <div className="artistPageDescription">
        {description || 'No description.'}
      </div>
    )

    return (
      <React.Fragment>
        {artistNameData}
        <Tags {...tagsProps} />
        {countersData}
        <Divider />
        {descriptionData}
      </React.Fragment>
    )
  }
}
