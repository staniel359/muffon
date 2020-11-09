import React from 'react'
import { List } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import PlayButton from 'global/player/buttons/Play'

export default class Track extends React.PureComponent {
  render () {
    const { track, hideSearch } = this.props

    const artistName = track.artist
    const trackTitle = track.title
    const trackId = track.id
    const playButtonProps = { artistName, trackTitle, trackId }
    const playButton = <PlayButton {...playButtonProps} />

    const artistNameEncoded = encodeURIComponent(artistName)
    const trackTitleEncoded = encodeURIComponent(trackTitle)
    const trackLink = `/artists/${artistNameEncoded}/tracks/${trackTitleEncoded}`

    return (
      <List.Item>
        <List.Icon className="searchItemIcon" verticalAlign="middle">
          {playButton}
        </List.Icon>

        <List.Content as={Link} to={trackLink} onClick={hideSearch}>
          <List.Header as="h4" content={trackTitle} />
          <List.Description content={artistName} />
        </List.Content>
      </List.Item>
    )
  }
}
