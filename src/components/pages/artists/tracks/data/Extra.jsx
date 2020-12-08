import React from 'react'
import { Label, Divider } from 'semantic-ui-react'
import Tags from 'global/Tags'

export default class Extra extends React.PureComponent {
  render () {
    const { track } = this.props
    const { tags, description } = track

    const artistNameEncoded = encodeURIComponent(track.artist)
    const trackTitleEncoded = encodeURIComponent(track.title)
    const tagsPageLink = `/artists/${artistNameEncoded}/tracks/${trackTitleEncoded}/tags`
    const tagsProps = { tags, viewMore: true, link: tagsPageLink }

    const listenersCount = track.listeners_count.toLocaleString('eu')
    const playsCount = track.plays_count.toLocaleString('eu')
    const countersData = (
      <Label.Group size="large">
        <Label basic icon="user" content={listenersCount} />
        <Label basic icon="music" content={playsCount} />
      </Label.Group>
    )

    const descriptionData = (
      <div className="trackPageDescription">
        {description || 'No description.'}
      </div>
    )

    return (
      <div className="trackPageExtra">
        <Tags {...tagsProps} />
        {countersData}

        <Divider />

        {descriptionData}
      </div>
    )
  }
}
