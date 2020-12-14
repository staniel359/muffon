import React from 'react'
import { Link } from 'react-router-dom'
import { List } from 'semantic-ui-react'
import Picture from 'global/artists/Picture'
import Ticker from 'global/Ticker'
import { v4 as uuid } from 'uuid'

export default class Track extends React.PureComponent {
  render () {
    const { track } = this.props

    const imageData = (
      <div className="playerPanelTrackImage">
        <Picture circular size="extrasmall" artistName={track.artist} />
      </div>
    )

    const artistNameEncoded = encodeURIComponent(track.artist)
    const trackTitleEncoded = encodeURIComponent(track.title)
    const trackLink = `/artists/${artistNameEncoded}/tracks/${trackTitleEncoded}`
    const trackTitleTickerData = (
      <Ticker key={uuid()}>
        <List.Header as="h4">
          <Link to={trackLink}>{track.title}</Link>
        </List.Header>
      </Ticker>
    )

    const artistLink = `/artists/${artistNameEncoded}`
    const artistNameTickerData = (
      <Ticker key={uuid()}>
        <List.Description>
          <Link to={artistLink}>{track.artist}</Link>
        </List.Description>
      </Ticker>
    )

    const trackData = (
      <List.Content className="playerPanelTrackContent">
        {trackTitleTickerData}
        {artistNameTickerData}
      </List.Content>
    )

    return (
      <List>
        <List.Item className="playerPanelTrack">
          {imageData}
          {trackData}
        </List.Item>
      </List>
    )
  }
}
