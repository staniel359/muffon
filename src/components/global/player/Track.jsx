import React from 'react'
import { Link } from 'react-router-dom'
import { List } from 'semantic-ui-react'
import Picture from 'global/artists/Picture'
import Ticker from 'global/Ticker'
import { v4 as uuid } from 'uuid'

export default class Track extends React.PureComponent {
  render () {
    const track = this.props.currentTrack
    const artistName = track.artist

    const imageData = (
      <div className="playerPanelTrackImage">
        <Picture size="extrasmall" {...{ artistName }} />
      </div>
    )

    const artistNameEncoded = encodeURIComponent(track.artist)
    const trackTitleEncoded = encodeURIComponent(track.title)
    const trackLink = `/artists/${artistNameEncoded}/tracks/${trackTitleEncoded}`
    const titleData = (
      <Ticker key={uuid()}>
        <List.Header as="h4">
          <Link to={trackLink}>{track.title}</Link>
        </List.Header>
      </Ticker>
    )

    const artistLink = `/artists/${artistNameEncoded}`
    const artistData = (
      <Ticker key={uuid()}>
        <List.Description>
          <Link to={artistLink}>{track.artist}</Link>
        </List.Description>
      </Ticker>
    )

    const trackData = (
      <List.Content className="playerPanelTrackContent">
        {titleData}
        {artistData}
      </List.Content>
    )

    return (
      <List className="playerPanelTrackWrap">
        <List.Item>
          {imageData}
          {trackData}
        </List.Item>
      </List>
    )
  }
}
