import React from 'react'
import { Link } from 'react-router-dom'
import { List } from 'semantic-ui-react'
import Picture from 'global/artists/Picture'
import Ticker from 'global/Ticker'
import { v4 as uuid } from 'uuid'

export default class Track extends React.PureComponent {
  render () {
    const { track } = this.props
    const artistName = track.artist

    const imageData = (
      <div className="playerPanelTrackImage">
        <Picture size="extrasmall" {...{ artistName }} />
      </div>
    )

    const artistNameEncoded = encodeURIComponent(artistName)
    const trackTitle = track.title
    const trackTitleEncoded = encodeURIComponent(trackTitle)
    const trackLink = `/artists/${artistNameEncoded}/tracks/${trackTitleEncoded}`
    const trackTitleTickerData = (
      <Ticker key={uuid()}>
        <List.Header as="h4">
          <Link to={trackLink}>{trackTitle}</Link>
        </List.Header>
      </Ticker>
    )

    const artistLink = `/artists/${artistNameEncoded}`
    const artistNameTickerData = (
      <Ticker key={uuid()}>
        <List.Description>
          <Link to={artistLink}>{artistName}</Link>
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
      <List className="playerPanelTrackWrap">
        <List.Item>
          {imageData}
          {trackData}
        </List.Item>
      </List>
    )
  }
}
