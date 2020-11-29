import React from 'react'
import { Label, Divider } from 'semantic-ui-react'
import { v4 as uuid } from 'uuid'
import { Link } from 'react-router-dom'

export default class Extra extends React.PureComponent {
  render () {
    const { track } = this.props

    const tagData = tag => (
      <Label key={uuid()} as={Link} to={`/tags/${tag}`} content={tag} />
    )
    const tagsListData = track.tags.map(tagData)
    const tagsViewMoreData = track.tags.length > 0 && (
      <Label as="a" content="..." />
    )
    const tagsData = (
      <Label.Group size="large">
        {tagsListData}
        {tagsViewMoreData}
      </Label.Group>
    )

    const listenersCount = track.listeners_count.toLocaleString('eu')
    const playsCount = track.plays_count.toLocaleString('eu')
    const countersData = (
      <Label.Group size="large">
        <Label basic icon="user" content={listenersCount} />
        <Label basic icon="music" content={playsCount} />
      </Label.Group>
    )

    const descriptionData = <div>{track.description || 'No description.'}</div>

    return (
      <div className="trackPageItemExtra">
        {tagsData}
        {countersData}

        <Divider />

        {descriptionData}
      </div>
    )
  }
}
